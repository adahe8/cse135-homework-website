#!/usr/bin/env ruby

# include CGI library
# require 'cgi';
# new = CGI.new('html5');

# puts cgi.header({"Cache-Control" => "no-cache", type => "text/html"});

# page = cgi.html {
#     cgi.head {
#         cgi.title {"Request Echo With Ruby CGI"}
#     } +
#     cgi.body {
#         cgi.h1({:align => 'center'}, "Request Echo with Ruby CGI") +
#         cgi.hr() +
#         cgi.p(cgi.bold("HTTP Protocol: ") + ENV['SERVER_PROTOCOL']) +
#         cgi.p(cgi.bold("Request Method: ") + ENV['REQUEST_METHOD']) +
#         cgi.p(cgi.bold("Query String: ") + (ENV['QUERY_STRING'])) +
#         # read request message body from standard input form data

#         cgi.p(cgi.bold("Message Body: ") )
#     }
# };
# puts page;

# HTTP header - not necessary if using cgi library, which does request handling
puts "Cache-Control: no-cache";
puts "Content-Type: application/json\n";

date = Time.now;
address = ENV['REMOTE_ADDR'] || "Unknown";

puts<<~START
<!DOCTYPE html>
<html>
<head>
<title>Request Echo With Ruby CGI</title>
</head>
<body>
<h1 align='center'>Request Echo with Ruby CGI</h1>
<hr>
<p><b>HTTP Protocol: </b> #{ENV['SERVER_PROTOCOL']}</p>
<p><b>Request Method: </b> #{ENV['REQUEST_METHOD']}</p>
<p><b>Host Name: </b> #{ENV['HTTP_HOST']}</p>
<p><b>Date: </b> #{date}</p>
<p><b>User Agent: </b> #{ENV['HTTP_USER_AGENT']}</p>
<p><b>Client IP Address: </b> #{address}</p>
<p><b>Query String: </b> #{ENV['QUERY_STRING'] || "None"}</p>
START
# read request message body from form data
if ENV['REQUEST_METHOD'] == 'POST' || ENV['REQUEST_METHOD'] == 'PUT'
    #code here
    content_length = ENV['CONTENT_LENGTH'].to_i;
    message_body = STDIN.read(content_length);
    puts "<p><b>Message Body: </b> #{message_body}</p>";
else ENV['REQUEST_METHOD'] == 'GET' || ENV['REQUEST_METHOD'] == 'DELETE'
    puts "<p><b>Message Body: </b>None for #{ENV['REQUEST_METHOD']} method</p>";
end

puts<<~END
</body>
</html>
END

