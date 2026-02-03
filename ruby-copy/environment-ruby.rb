#!/usr/bin/ruby

# HTTP header - not necessary if using cgi library, which does request handling
print "Cache-Control: no-cache\n";
print "Content-Type: text/html\n\n";

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
puts "<title>Environment Variables in Ruby CGI</title>";
puts "</head>";
puts "<body>";
puts "<h1 align='center'>Environment Variables</h1><hr>";

for key in ENV.keys.sort do
    value = ENV[key];
    puts "<p>#{key} = #{value}</p>";
end
puts "</body>";
puts "</html>";