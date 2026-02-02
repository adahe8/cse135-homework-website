#!/usr/bin/perl

print "Cache-Control: no-cache\n";
print "Content-Type: text/html\n\n";

print "<!DOCTYPE html>";
print "<html>";
print "<head>";
print "<title>Hello CGI World</title>";
print "</head>";
print "<body>";

print "<h1 align=center>Welcome, readers!</h1><hr/>";
print "<h2>Manifesto</h2>";
print "<p>Storytelling is the common language of humanity.</p>";
print "<h2>Page Details</h2>";
print "<p>This page was generated with the Perl programming langauge by Carmen & Ada He</p>";

$date = localtime();
print "<p>This program was generated at: $date</p>";

# IP Address is an environment variable when using CGI
$address = $ENV{REMOTE_ADDR};
print "<p>Your current IP Address is: $address</p>";

print "</body>";
print "</html>";
