# SnapShot-ki
Project 2 for General Assembly SEI

[Live App](https://snapshotski.herokuapp.com/)

## About
SnapShot-Ki is an app built using the following Technologies
- Node.js
	- express
	- mongoose
		- Node.js module used to create a mongoose database using schema and models. this app uses two models users and posts.
	- Multer
		- Node.js module used to upload and store files. I used it to store the uploaded images on disk. Really should use other technology or fully implement multer-s3 to send files to the cloud because heroku is not persistent.
	- fs
		- Node.js module used to access and edit the file system of the app
- materialize
	- The only css framework used in this project.

### biggest headaches
1. Internal server Error on heroku when Multer would try to save to a folder that doesnt exist in the heroku app. to solve this the folder has to be pushed to heroku with a file in it to create that folder in the heroku app. cannot be an empty folder.
2. The file path multer first gave me was wrong and needed to be one level down and this confused me for a while
3. Materialize was hard to work with when trying to make a grid of the images. Should have started with a recomended framework. But i really like how materialize looks

## Problems to fix

1. if user deletes account postsare left and trying to go to account is dead end.
2. images need to go to cloud for the app to be persistent with the images

