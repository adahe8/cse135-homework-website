#! /usr/bin/ruby
require 'cgi';
require 'cgi/session';

#create CGI object
cgi = CGI.new();

# destroy session
begin
    session = CGI::Session.new(cgi, 'new_session' => false);
    session.delete;
rescue nil;
end
# Print the HTTP header with an empty line after for separation