HTTPS / SSL:

1. get / generate SSL certificate (*.key and *.crt files)
	1. NOTE: to get a "trusted" certificate (for production) that browsers won't issue a warning for, it will cost money (around $50 - $100+ per year)
	2. add certificates (i.e. to the `app` folder) and then reference those certifications in `config.json` `ssl` key/object
	3. set `server.scheme` to `https` in `config.json`
2. open port 443
3. configure (node) server to use certificates and HTTPS (instead of plain HTTP) and port 443

- startSSL for free (development) certificate

- generating self-signed certificate (using openSSL)
	- https://devcenter.heroku.com/articles/ssl-certificate-self
	- https://devcenter.heroku.com/articles/ssl-endpoint#acquire-ssl-certificate
	- NOTE: can use 'localhost' for Common Name / domain
	- full steps copied / combined from above:
		- `which openssl`
		- `openssl genrsa -des3 -out ssl.pass.key 2048` to generate pass key
			- when prompted, enter EASY password value as it's just for generating CSR, not the actual password the app will use
		- `openssl rsa -in ssl.pass.key -out ssl.key` to strip password and generate key
		- `openssl req -nodes -new -key ssl.key -out ssl.csr`
			- most can be blank / are self-explanatory but make sure to use proper country code
			- use your domain name for the 'Common Name' prompt, e.g. `example.com` or `www.example.com` or `*.example.com` or `localhost`
			- leave the 'Challenge Password' blank (just press 'Enter' to skip)
		- `openssl x509 -req -days 365 -in ssl.csr -signkey ssl.key -out ssl.crt`
	
- using with node.js / express (already handled for you in MEAN-seed - just update `config.json` `ssl` field to point to your certs and be enabled)
	- http://stackoverflow.com/questions/21397809/create-a-self-signed-ssl-cert-for-localhost-for-use-with-express-node
	- http://stackoverflow.com/questions/5998694/how-to-create-an-https-server-in-node-js
		- http://expressjs.com/api.html#app.listen
		- http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
		
		
- places that do (or DID) have 'http' scheme
	- ci.js
	- Gruntfile.js
	- app
		- modules
			- emailMandrill.js
		- src
			- index-*-grunt.html
			- config-grunt.js
			- protractor.conf-grunt
		- test
			- apiTestHelpers.js
	- docs
		- README
		