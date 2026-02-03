#! /usr/bin/ruby
require 'cgi';
require 'cgi/session';

#create CGI object
cgi = CGI.new();
session = CGI::Session.new(cgi);

# access session data
name = session['username'] || "Guest";
book = session['favorite_book'] || "Unknown";
session_id = session.session_id;

# output session data before destroying
puts cgi.header(type:'text/html');
puts "<!DOCTYPE html>";
puts "<html>";
puts "<head>";
puts "<title>Destroying Ruby CGI Session</title>";
puts "</head>";
puts "<body>";
puts "<h1 align='center'>Destroying Ruby CGI Session</h1>";
puts "<hr>";
puts "<p>Bye #{name || 'Guest'}</b>! Thank you for sharing your favorite book <i>#{book || 'Unknown'}</i>.</p>";
puts "<p>Destroying session with ID/Cookie: <b>#{session_id}</b>...</p>";
puts "<hr>";

# destroy session & remove cookie
session.delete;
session.close;

puts "<p>Your session has been destroyed.</p>";
puts "<p><a href='/cgiforms/ruby-cgiform.html'>New Session</a></p>";
puts "<p><a href='/'>Home</a></p>";
puts "</body>";
puts "</html>";