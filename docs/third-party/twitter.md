# Using Twitter

## Twitter Login
@todo
- note that Twitter does NOT give email address: https://dev.twitter.com/discussions/4019


## Twitter API Calls
@todo
	
	
## Share (Tweet)
- make sure you've set your application on dev.twitter.com to have read and WRITE permissions in the application permissions / settings
- with media (picture(s))
	- https://dev.twitter.com/docs/api/1.1/post/statuses/update_with_media
		- see https://dev.twitter.com/docs/api/1.1/get/help/configuration for limits, i.e.:
			- 1 'max_media_per_upload'
				- only can upload 1 picture
			- 23 'characters_reserved_per_media'
				- your tweet / status must be shorter accordingly
			- 3145728 'photo_size_limit'
				- around 3MB photo limit