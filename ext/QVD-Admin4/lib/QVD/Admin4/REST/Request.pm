package QVD::Admin4::REST::Request;
use strict;
use warnings;
use Moose;
use QVD::Admin4::Exception;

has 'db',        is => 'ro', isa => 'QVD::DB',     required => 1;
has 'json',      is => 'ro', isa => 'HashRef',     required => 1;
has 'config',    is => 'ro', isa => 'HashRef',     required => 1;
has 'mapper',    is => 'ro', isa => 'Config::Properties';
has 'free',      is => 'ro', isa => 'HashRef',     default => sub { {}; };
has 'modifiers', is => 'ro', isa => 'HashRef',     default => sub { {}; };
has 'dependencies', is => 'ro', isa => 'HashRef',  default => sub { {}; };
has 'customs',   is => 'ro', isa => 'HashRef',    default => sub { {}; };

######################
# CHECKING FUNCTIONS #
######################

# These functions control that 
# a right input request has been received

sub _check
{
    my $self = shift;

    $self->stablish_default_structure;
    $self->check_credentials_values;
    $self->check_filters;
    $self->check_arguments;
}

# It stablish a default empty structre
# just in case same field has not been specified in input

sub stablish_default_structure
{
    my $self = shift;

    $self->json->{filters} //= {};
    $self->config->{arguments} //= {};
    $self->config->{filters} //= {};
    $self->config->{mandatory} //= {};
    $self->config->{free} //= {};
    $self->config->{order_by} //= {};
    $self->config->{default} //= {};

    $self->modifiers->{page} = $self->json->{offset} // 1; 
    $self->modifiers->{rows}  = $self->json->{block} // 10000; 
    $self->modifiers->{distinct} = 1;
    $self->modifiers->{join} //= [];
    $self->get_customs; # It instantiates $self->{customs} with custom
}                       # properties keys concerning the object itself

# It instantiates $self->{customs} with custom
# properties keys concerning the object itself

sub get_customs
{
    my $self = shift;

    my $table = ref($self);
    $table =~ s/^QVD::Admin4::REST::Request::(.+)$/$1/;
    $table .= "_Property";
    my $n = 0;
    my $props = {map { $_->key => 1 } 
		 $self->db->resultset($table)->all};

    for my $custom (keys %$props)
    {
	next unless (exists $self->json->{filters}->{$custom}       ||
	             exists $self->json->{arguments}->{$custom}     ||
		     (exists $self->json->{order_by}->{field}         &&
		     $self->json->{order_by}->{field} eq $custom));
	$n++;
	my $alias = $n eq 1 ? 'properties' : 'properties_'.$n;
	$self->customs->{$custom} = $alias;

	$self->mapper->setProperty("$alias.key","$alias.key");
	$self->mapper->setProperty("$alias.value","$alias.value");

	push @{$self->modifiers->{join}}, 'properties';
    }
}

# It checks that the input structure
# has right credential values (it belongs
# to a tenant and has a role)

sub check_credentials_values
{
    my $self = shift;
    $self->json->{tenant} || 
	QVD::Admin4::Exception->throw(code => 6);

    $self->json->{role} || 
	QVD::Admin4::Exception->throw(code => 7);

    QVD::Admin4::Exception->throw(code => 8)
	unless (exists $self->config->{roles}->{$self->json->{role}} ||
		exists $self->config->{roles}->{'all'});

    $self->json->{filters}->{tenant} = $self->json->{tenant}
    if exists $self->config->{filters}->{tenant};
}

# It checks that filters provided by the input
# request are valid filters for current actions

sub get_fields
{
    my ($self,$qvd_obj,$criterium) = @_;

    ( map { $_->name } $self->db->resultset('Config_Field')->search(
	  {qvd_obj => $qvd_obj,
	   $criterium => 'true'})->all);
}

sub check_filters
{
    my $self = shift;

    exists $self->{config}->{filters}->{$_}         ||
    exists $self->{customs}->{$_} ||
	QVD::Admin4::Exception->throw(code => 9)
	for keys %{$self->json->{filters}};

    exists $self->json->{filters}->{$_} ||
	QVD::Admin4::Exception->throw(code => 10)
	for keys %{$self->config->{mandatory}};
}

# It checks that arguments provided by the input
# request are valid filters for current actions

sub check_arguments
{
    my $self = shift;

    exists $self->config->{arguments}->{$_} ||
	$_ eq 'properties'                  ||
	$_ eq 'tags'                        ||
    exists $self->{customs}->{$_}           ||
	QVD::Admin4::Exception->throw(code => 12)
        for keys %{$self->json->{arguments}};
}

#####################
# MAPPING FUNCTIONS #
#####################

# These functions map input request structure
# into the inner structure used by the system

sub _map 
{ 
    my $self = shift;

    $self->map_filters;
    $self->map_arguments;
    $self->map_order_by;
}

# It maps input filter names into
# inner filter names

sub map_filters
{
    my $self = shift;

    $self->map_custom_properties_filters;
    $self->map_free_filters; # free filters need a special 
                             # operator in value
    for my $filter (keys %{$self->json->{filters}})
    {
	my $mfil = $self->mapper->getProperty($filter) // 
	    QVD::Admin4::Exception->throw(code => 11);
	$self->json->{filters}->{$mfil} = 
	    delete $self->json->{filters}->{$filter};
    }
}

sub map_custom_properties_filters
{
    my $self = shift;

    while (my ($custom,$alias) = each  %{$self->{customs}})
    {
	my $value =  delete $self->json->{filters}->{$custom} // next;

	$self->json->{filters}->{"$alias.key"} = $custom;
	$self->json->{filters}->{"$alias.value"} = $value;
	$self->config->{free}->{"$alias.value"} = 1; # FIX ME: CHANGING PERSISTENT INFO STRUCTURE
    }
}

# It apply the non-default like operator to
# input filters's values tagged as free

sub map_free_filters 
{
    my $self = shift;

    for my $filter (keys %{$self->config->{free}})
    {
	$self->json->{filters}->{$filter} = 
	    { like => $self->json->{filters}->{$filter}."%"}
	if exists $self->json->{filters}->{$filter};
    }
}

# It maps input argument names into inner argument 
# names, with addition of default values and
# a distinction by straight/related arguments
# where straight are arguments in the table itself
# and related in related tables

sub map_arguments
{
    my $self = shift;    

    for my $argument (keys %{$self->json->{arguments}})
    {
	next if ($argument eq 'properties' || $argument eq 'tags');
	my $value = 
	    delete $self->json->{arguments}->{$argument};
	$self->instantiate_argument($argument,$value);  
	    
    }

    $self->map_default; # Add default values
}

# It maps default input structure into inner names

sub map_default
{
    my $self = shift;

    while (my ($argument,$value) = each %{$self->config->{default}})
    {
	$self->instantiate_argument($argument,$value)
	    unless $argument eq "SYSTEM";
    }

    $self->map_default_system;
}


# It's posible to postpone the default value to an inner 
# computation. These computed values are found here

sub map_default_system
{
    my $self = shift;

    my $SYSTEM = $self->config->{default}->{SYSTEM} // {};

    while (my ($argument,$method) = each %$SYSTEM)
    {
	my $value = $self->$method;
	$self->instantiate_argument($argument,$value);
    }
}


sub instantiate_argument
{
    my ($self,$argument,$value) = @_;

    my $marg = $self->mapper->getProperty($argument) //
	QVD::Admin4::Exception->throw(code => 13);

    my ($table,$column) = $marg =~ /^(.+)\.(.+)$/;

    $table eq 'me'                                                       ?
    $self->json->{arguments}->{straight}->{$column} //= $value           :
    $self->json->{arguments}->{related}->{$table}->{$column} //= $value;
}

# It maps input order_by info into
# inner dbix structure

sub map_order_by
{
    my $self = shift;
    $self->json->{order_by} || return;
    my $field = $self->json->{order_by}->{field} // return;
    my $order = $self->json->{order_by}->{order} // '-asc';

    if (exists $self->{customs}->{$field})
    { 
	$ENV{QVD_ADMIN4_CUSTOM_JOIN_CONDITION} = $field;
	$field = $self->{customs}->{$field} . ".value";
    }
    $field = $self->mapper->getProperty($field) // 	    
	QVD::Admin4::Exception->throw(code => 14);

    $self->modifiers->{order_by} = {$order => $field};
}

#####################################
# FUNCTIONS TO RETRIEVE INFORMATION #
# ABOUT THE REQUEST                 #
#####################################

sub arguments 
{
    my $self = shift;
    my %modifiers = @_;

    return $self->json->{arguments}->{properties} || {}
    if $modifiers{custom};

    return $self->json->{arguments}->{related} || {}
    if $modifiers{related};

    return $self->json->{arguments}->{tags} || {}
    if $modifiers{tags};

    return $self->json->{arguments}->{straight} || {};
}

sub action 
{
    my $self = shift;
    $self->json->{action};
}

sub table 
{
    my $self = shift;
    $self->config->{table};
}

sub filters 
{
    my $self = shift;
    $self->json->{filters};
}

1;
