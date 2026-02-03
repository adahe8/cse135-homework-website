#/usr/bin/ruby

require 'cgi';
require 'cgi/session';

# destroy old session if it exists
begin
    session = CGI::Session.new(cgi, 'new_session' => false);
    session.delete;
rescue nil;
end

# create a new CGI session
session = CGI::Session.new(cgi, 'new_session' => true);

# create CGI object
cgi = CGI.new();

# manage state with new Cookie from session id
cookie = CGI::Cookie.new('name' => 'ruby_cgi_session', 'value' => session.session_id, 'path' => '/cgi-bin/ruby/');

# store data sent via form params into cgi session
session['username'] = cgi['username'];
session['favorite_book'] = cgi['favorite_book'];
name = session['username'] || "";

# Print the HTTP header with an empty line after for separation
puts cgi.header('type' => 'text/html', 'cookie' => cookie);

# Print the HTML content
puts <<~CONTENT
<!DOCTYPE html>
<html>
<head>
<title>Ruby CGI Sessions</title>
</head>
<body>
<hgroup>
<h1 align='center'>Ruby CGI Sessions</h1>
<p align='center'>State management handled with cookies.</p>
</hgroup>
<hr>
<p>Welcome, <b>#{name}</b>!</p>
<p><b>Favorite Book: </b> #{session['favorite_book']}</p>
<p><b>Session ID: </b> #{session.session_id}</p>
<p><b>Storage: </b> Cookie #{cookie.value}</p>
<p><a href='/cgiforms/ruby-cgiform.html'>Return to Form</a></p>
<form method='get' action='/cgi-bin/ruby/destroy-state-ruby.rb'>
<button type='submit'>Destroy Session</button>
</form>
</body>
</html>
CONTENT

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