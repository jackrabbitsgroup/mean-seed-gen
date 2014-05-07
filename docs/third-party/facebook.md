# Using Facebook

## Facebook Login
Two ways to do this:
1. with an SDK (i.e. javascript SDK)
2. manually
	1. https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/

## Facebook API Calls
The main (only?) way to do this is the Graph API. There's 3 ways to do this:
1. FB.api IF have the Javascript SDK included
	1. BUT it's HUGE (160k minified) AND it doesn't work on Chrome iOS so don't use it unless there's no other way
		1. http://stackoverflow.com/questions/16843116/facebook-oauth-unsupported-in-chrome-on-ios
2. server side HTTP request
	1. the best way - this is how we use it after we do a manual facebook login flow.
		1. https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/
3. frontend HTTP request (CORS supported or will this give cross-domain permissions / security issues? Do we need to ONLY send auth token or do we need to send any secret info such as facebook app secret that should NOT be sent / stored / used client side?)
	1. [haven't tried this, just use backend / server-side instead]