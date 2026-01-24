# CSE135 WI26 Homework Center
## Group Members
Ada He  
Carmen He  
## Server Information
Droplet Name: sourdough-library  
IP address: 159.89.132.244  
### Grader Login
Username: grader  
Password: graderaccount!  
## Hosted Site 
Visit [https://randomain.site](our homework site)!  
grader login: grader  
password: grading  
### Autodeploy
Set up through tracking history in special repository of bare copy in remote server, then cloning in the repository and and linking it to push to production copy (the bare copy). The `post-receive` github hook runs scripts that would affect the corresponding index.html page in the randomain.site file. 

## Process Documentation
![initial Apache 2 default page](images/setup/intial-index.png)  
![edited index page](images/setup/modified-index.png)  
![validated copied pages](images/setup/validator-initial.png)  
![collector and reporting pages also hosted](images/setup/vhosts-verify.png)  
![verified to use https](images/setup/SSL-verify.png)
## Part 3 Explanations
### Step 5
We chose to enable mod_deflate to compress pages delivered to client. By checking the configuration file located at /etc/apache2/mods-enabled/deflate.conf in our server, we confirm that the deflate module is compressing html, css, and javascript files. After this module is enabled, we can see on the client side through dev tools that the HTTP response for the main html document of the site contains the header `Content-Type: gzip`, indicating that compression is happening. Compared to the resources delivered (61.5 kB), there is little difference in size after compression, which is expected at this stage of development, where only a few requests are made for relatively small files.

### Step 6
To obfuscate information about the server in response headers, which can expose information that can be exploited on the client side, we first changed the default security configuration (security.conf) to hide the server signature (ServerSignature Off) which discloses the server version and virtual host name. Then we enabled the mod_security2 module, which includes different security features, including SecServerSignature, which hides server details in a custom alias that we set to “CSE135 Server”.
