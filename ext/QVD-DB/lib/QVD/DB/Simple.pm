package QVD::DB::Simple;

use strict;
use warnings;

use QVD::DB;

use Exporter qw(import);
our @EXPORT = qw(db txn_do txn_eval rs);

my $db;

sub db () {
    $db ||= QVD::DB->new()
}

sub txn_do (&) {
    $db ||= QVD::DB->new();
    $db->txn_do(@_);
}

sub txn_eval (&) {
    $db ||= QVD::DB->new();
    local $@;
    eval { $db->txn_do(@_) }
}

sub rs (*) {
    ($db ||= QVD::DB->new())->resultset($_[0]);
}

1;
