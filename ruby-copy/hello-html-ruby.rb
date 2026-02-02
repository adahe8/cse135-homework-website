#!/usr/bin/env ruby

# Print the HTTP header with an empty line after for separation
puts "Cache-Control: no-cache";
puts "Content-Type: text/html\n";

# Print the HTML content
puts <<~CONT
<!DOCTYPE html>
<html>
<head>
<title>Hello, CGI World with Ruby!</title>
</head>
<body>
<h1 align=center>Welcome, Readers</h1><hr>
<p>This page is created with :&hearts; by Carmen & Ada He with Ruby CGI!</p>
<section border='1px solid black' style='padding: 10px;margin: 10px;'>
<h2 align=center>Ruby Output Manifesto</h2>
<p>Storytelling is the common language of humanity. The web is a medium for storytelling, and Ruby is a language that allows us to harness the web for storytelling.</p>"
<pre>"
# Include the contents of test.rb here (reading files and strings practice)
puts File.read("test.rb");
</pre>
<p>This is script is a demonstration of writing strings in Ruby.</p>
</section>

<section>
<h2 align=center style='text-decoration:underline'>Page Details</h2>
CONT

# Print genration time with string interpolation
date = Time.now
puts "<p>This program was generated on: #{date}</p>";

# Print IP address of the client
address = ENV['REMOTE_ADDR'] || "Unknown";
puts <<~END
<p>Your current IP address is: #{address}</p>
</section>
</body>
</html>
END


