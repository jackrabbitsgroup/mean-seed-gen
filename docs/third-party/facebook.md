# Using Facebook

## Facebook Login
Two ways to do this:
1. with an SDK (i.e. javascript SDK)
2. manually

## Facebook API Calls
The main (only?) way to do this is the Graph API. There's 3 ways to do this:
1. FB.api IF have the Javascript SDK included
2. server side HTTP request
3. frontend HTTP request (CORS supported or will this give cross-domain permissions / security issues? Do we need to ONLY send auth token or do we need to send any secret info such as facebook app secret that should NOT be sent / stored / used client side?)