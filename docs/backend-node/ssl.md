HTTPS / SSL:

1. get / generate SSL certificate (*.key and *.crt files)
	1. NOTE: to get a "trusted" certificate (for production) that browsers won't issue a warning for, it will cost money (around $100 per year)
2. open port 443
3. configure (node) server to use certificates and HTTPS (instead of plain HTTP) and port 443

- startSSL for free (development) certificate

- generating self-signed certificate (using openSSL)
	- https://devcenter.heroku.com/articles/ssl-certificate-self
	- https://devcenter.heroku.com/articles/ssl-endpoint#acquire-ssl-certificate
	- NOTE: can use 'localhost' for Common Name / domain
	
- using with node.js / express (already handled for you in MEAN-seed - just update `config.json` `ssl` field to point to your certs and be enabled)
	- http://stackoverflow.com/questions/21397809/create-a-self-signed-ssl-cert-for-localhost-for-use-with-express-node
	- http://stackoverflow.com/questions/5998694/how-to-create-an-https-server-in-node-js
		- http://expressjs.com/api.html#app.listen
		- http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
		
		
- places that have 'http'
	- config-grunt.js
	- apiTestHelpers.js
	- emailMandrill.js
	- index-*-grunt.html