#!/usr/bin/env ruby
require 'json'
# require 'cgi'

# HTTP header - not necessary if using cgi library, which does request handling
puts "Cache-Control: no-cache";
puts "Content-Type: application/json\n";

# Store data to include in response
date = Time.now;
address = ENV['REMOTE_ADDR'] || "Unknown";

message = {message: 'Created with ♥ by Carmen & Ada He with Ruby CGI!', date: date, currentIP: address};

# if using CGI library
# cgi = CGI.new
# puts cgi.header("type" => "application/json")

# output JSON
puts JSON.generate(message);