#!/usr/bin/ruby

# create HTTP header - not necessary if using cgi library, which does request handling
print "Cache-Control: no-cache";
print "Content-Type: text/html\n\n";

# HTML content
puts "<!DOCTYPE html>";
puts "<html>";
puts "<head>";
puts "<title>Request Echo With Ruby CGI</title>";
puts "</head>";
puts "<body>";
puts "<h1 align='center'>Echo Form Results</h1>";
puts "<hr>";
puts "<h2>Ruby Form Handling</h2>";
puts "<p><b>HTTP Protocol: </b> #{ENV['SERVER_PROTOCOL']}</p>";
puts "<p><b>Request Method: </b> #{ENV['REQUEST_METHOD']}</p>";
puts "<p><b>Host Name: </b> #{ENV['HTTP_HOST']}</p>";
puts "<p><b>Date: </b> #{ENV['DATE'] || Time.now}</p>";
puts "<p><b>User Agent: </b> #{ENV['HTTP_USER_AGENT']}</p>";
puts "<p><b>Client IP Address: </b> #{ENV['REMOTE_ADDR'] || "Unknown"}</p>";
puts "<p><b>Query String: </b> #{ENV['QUERY_STRING'] || "None"}</p>";

# handle request method hidden field read request message body from form data
# read form data from index.js fetch request
if ENV['REQUEST_METHOD'] == 'POST'
    formdata = 
    # puts "<p><b>Message Body: </b> #{message_body}</p>";
else ENV['REQUEST_METHOD'] == 'GET' || ENV['REQUEST_METHOD'] == 'DELETE'
    puts "<p><b>Message Body: </b>None for #{ENV['REQUEST_METHOD']} method</p>";
end

puts "</body>";
puts "</html>";