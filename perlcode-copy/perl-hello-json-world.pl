#!/usr/bin/perl
# In Perl, you must first install the JSON package from CPAN (the Perl equivalent to npm)
use lib '/opt/perl5/lib/perl5';
use JSON;

print "Cache-Control: no-cache\n";
print "Content-type: application/json\n\n";

$date = localtime();
$address = $ENV{REMOTE_ADDR};

my %message = ('title' => 'Perl on Literally', 'heading' => 'Welcome, Readers!', 'message' => 'This page was generated with the Perl programming language by Carmen & Ada He', 'time' => $date, 'IP' => $address);

my $json = encode_json \%message;
print "$json\n";
