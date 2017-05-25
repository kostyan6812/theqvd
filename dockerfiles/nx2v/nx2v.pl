#!/usr/bin/perl
use strict;
use warnings;
use Getopt::Long;
use IPC::Open3;

my $nx2v_log = "/var/log/nx2v.log";
my $x11vnc_log = "/var/log/x11vnc.log";
open(my $fh, ">>", $nx2v_log);

my $timeout = 60;
local $SIG{ALRM} = sub {
    if (--$timeout) {
        alarm 1;
    } else {
        print $fh "[ERROR] Timeout starting the client\n";
        exit(1);
    }
};


my $displayID = 0;
my $host;
my $port;
my $vm_id; 
my $login; 
my $password;
my $token;
my $resolution = '1024x768x24';
my $stdio = 0;
my $wait_for_start_msg = 0;
my $console = 0;

GetOptions(
    'host=s'     => \$host,
    'port=i'     => \$port,
    'vm-id=i'    => \$vm_id,
    'login=s'    => \$login,
    'password=s' => \$password,
    'token=s'    => \$token,
    'resolution=s' => \$resolution,
    'stdio'      => \$stdio,
    'wait-for-start-msg' => \$wait_for_start_msg,
    'console'    => \$console,
) or (print "[ERROR] Incorrect usage!\n" && exit(1));

if($console){
    exec('/bin/bash');
}

unless(defined($host) && defined($port) && defined($vm_id)) {
    print "[ERROR] The host address and port, and the vm to be connected to must be defined\n";
    exit(1);
}

unless(defined($token) || (defined($login) && defined($password))){
    print "[ERROR] Any credentials must be provided (token or login/password)\n";
    exit(1);
}

print $fh "[DEBUG] Launch xinit ...\n";

my $xvfb_bin = "/usr/bin/Xvfb";
my @xvfb_args = (":$displayID", "-screen", "0", "$resolution");
my $client_bin = "/usr/bin/qvdclient";
my @client_args = ("-h", "$host", "-p", "$port", "-n", "-s", "$vm_id", "-f");
if(defined($token)) {
    push @client_args, ("-b", "$token");
} else {
    push @client_args, ("-u", "$login", "-w", "$password");
}

my $pid = fork();
if($pid == 0) {
    open (STDERR, '>>&', $fh);
    open (STDOUT, '>>&', $fh);
    exec("xinit", $client_bin, @client_args, "--", $xvfb_bin, @xvfb_args);
} else {
    alarm 1;
    while(my $msg = <$fh>) {
        last if ($msg =~ /Established X server connection./);
    }
    alarm 0;
}

<STDIN> if ($wait_for_start_msg); # Wait until a message is received

print $fh "[DEBUG] Launch x11vnc...\n";
close($fh);
my @x11vnc_args = ("-o", $x11vnc_log, "-v", "-flag", "/var/run/x11vnc.port", "-display", ":$displayID");
push @x11vnc_args, "-inetd" if ($stdio);
exec("x11vnc",  @x11vnc_args );
