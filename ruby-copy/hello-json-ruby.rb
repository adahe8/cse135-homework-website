#!/usr/bin/ruby
require 'json'

# HTTP header - not necessary if using cgi library, which does request handling
print "Cache-Control: no-cache\n";
print "Content-Type: application/json\n\n";

# Store data to include in response
date = Time.now;
address = ENV['REMOTE_ADDR'] || "Unknown";

message = {:message => 'Created with ♥ by Carmen & Ada He with Ruby CGI!', :date => date, :currentIP => address};

# output JSON
puts JSON.generate(message);