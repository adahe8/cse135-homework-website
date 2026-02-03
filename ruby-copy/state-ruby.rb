#/usr/bin/ruby
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
puts cgi.header(type:'text/html');

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
puts "<form method='post' action='/cgi-bin/ruby/destroy-state-ruby.rb'>";
puts "<button type='submit'>Destroy Session</button>";
puts "</form>";
puts "</body>";
puts "</html>";

# with html cgi library
# page = cgi.html {
#     cgi.head {
#         cgi.title { "Ruby CGI Sessions" }
#     } +
#     cgi.body {
#         cgi.hgroup(cgi.h1({:align => 'center'}, "Ruby CGI Sessions") + cgi.p({:align => 'center'}, "State management handled with cookies.")) +
#         cgi.hr() +
#         cgi.p("Welcome, " + cgi.bold("#{name}") + "!") +
#         cgi.p(cgi.bold("Favorite Book: ") + "#{session['favorite_book']}") +
#         cgi.p(cgi.bold("Session ID: ") + "#{session.session_id}") +
#         cgi.p(cgi.bold("Storage: ") + "Cookie #{cookie.value}") +
#         cgi.p(cgi.a({:href => '/ruby-cgiform.html'}, "Return to Form")) +
#         cgi.form({:method => 'get', :action => '/cgi-bin/ruby/destroy-state-ruby.rb'}) {
#             cgi.button({:type => 'submit'}, "Destroy Session");
#         }
#     }
# };
# puts page;