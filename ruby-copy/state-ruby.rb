#!/usr/bin/ruby
require 'cgi';
require 'cgi/session';

# create CGI object
cgi = CGI.new();

# create a new CGI session
session = CGI::Session.new(cgi,
    "database_manager" => CGI::Session::FileStore, # temp stores data on server and sends cookie to client
    "session_key" => 'ruby_cgi_session',
    "session_expires" => Time.now + 1800, # 30 min window
    "new_session" => true
);

# store form data params in session
if cgi.key?('username') && !cgi['username'].strip.empty?
    session['username'] = cgi['username'];
    session['favorite_book'] = cgi['favorite_book'];
end

name = session['username'] || "Guest";
book = session['favorite_book'] || "Unknown";

session.close; # save session data

# HTTP response
print "#{cgi.header(type:'text/html')}\n\n";

# Print the HTML content
puts "<!DOCTYPE html>";
puts "<html>";
puts "<head>";
puts "<title>Ruby CGI Sessions</title>";
puts "</head>";
puts "<body>";
puts "<hgroup>";
puts "<h1 align='center'>Ruby CGI Sessions</h1>";
puts "<p align='center'>State management handled with cookies.</p>";
puts "</hgroup>";
puts "<hr>";
puts "<p>Welcome, <b>#{name}</b>!</p>";
puts "<p><b>Favorite Book: </b> #{book}</p>";
puts "<p><b>Session ID/Cookie: </b> #{session.session_id}</p>";
puts "<p><a href='/cgiforms/ruby-cgiform.html'>Return to Form</a></p>";
puts "<form method='post' action='/cgi-bin/destroy-state-ruby.rb'>";
puts "<button type='submit'>Destroy Session</button>";
puts "</form>";
puts "</body>";
puts "</html>";