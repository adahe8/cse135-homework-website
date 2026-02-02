#!/usr/bin/env ruby

# HTTP header - not necessary if using cgi library, which does request handling
puts "Cache-Control: no-cache";
puts "Content-Type: application/json\n";

puts<<~START
<!DOCTYPE html>
<html>
<head>
<title>Environment Variables in Ruby CGI</title>
</head>
<body>
<h1 align='center'>Environment Variables</h1><hr>
START
for key in ENV.keys.sort do
    value = ENV[key];
    puts "<p>#{key} = #{value}</p>";
end
puts<<~END
</body>
</html>
END

# include CGI library -- more overhead
# require 'cgi';
# cgi = CGI.new('html5');

# puts cgi.header({"Cache-Control" => "no-cache", type => "text/html"});

# page = cgi.html {
#     cgi.head {
#         cgi.title { "Environment Variables in Ruby CGI" }
#     } +
#     cgi.body {
#         cgi.h1({:align => 'center'}, "Environment Variables") +
#         cgi.hr() +
#         ENV.keys.sort.map { |key|
#             value = ENV[key];
#             cgi.p { "#{key} = #{value}" }
#         }.join # joins output array into one string
#     }
# };
# puts page;


