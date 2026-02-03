#!/usr/bin/ruby

# Print the HTTP header with an empty line after for separation
print "Cache-Control: no-cache\n";
print "Content-Type: text/html\n\n";

# Print the HTML content
puts "<!DOCTYPE html>";
puts "<html>";
puts "<head>";
puts "<script async src='https://www.googletagmanager.com/gtag/js?id=G-JKXPXHQ6FZ'></script>";
puts "<script>";
puts "window.dataLayer = window.dataLayer || [];";
puts "function gtag(){dataLayer.push(arguments);}";
puts "gtag('js', new Date());";
puts "gtag('config', 'G-JKXPXHQ6FZ');";
puts "</script>";
puts "<title>Hello, CGI World with Ruby!</title>";
puts "</head>";
puts "<body>";
puts "<h1 align='center'>Welcome, Readers</h1><hr>";
puts "<p>This page is created with :&hearts; by Carmen & Ada He with Ruby CGI!</p>";
puts "<section style='border:1px solid black;padding:10px;margin:10px;'>";
puts "<h2 align='center'>Ruby Output Manifesto</h2>";
puts "<p>Storytelling is the common language of humanity. The web is a medium for storytelling, and Ruby is a language that allows us to harness the web.</p>";
# Print generation time with string interpolation
date = Time.now;
puts "<p>This program was generated on: #{date}</p>";

#Print the IP address of the client
address = ENV['REMOTE_ADDR'] || "Unknown";
puts "<p>Your current IP address is: #{address}</p>";

puts "</section>";
puts "</body>";
puts "</html>";