# SnapShot-ki
Project 2 for General Assembly SEI

[Live App](https://snapshotski.herokuapp.com/)

## About
SnapShot-Ki is an app built using the following Technologies
- Node.js
	- express
	- mongoose
		- Node.js module used to create a mongoose database using schema and models. this app uses two models users and posts.
	- fs
		- Node.js module used to access and edit the file system of the app. Used it to put uploaded images temporarily on disk before i upload them to mongoDB as a buffer.
- materialize
	- The only css framework used in this project.

### biggest headaches
1. Internal server Error on heroku when Multer would try to save to a folder that doesnt exist in the heroku app. to solve this the folder has to be pushed to heroku with a file in it to create that folder in the heroku app. cannot be an empty folder.
2. The file path multer first gave me was wrong and needed to be one level down and this confused me for a while
3. Materialize was hard to work with when trying to make a grid of the images.But i really like how materialize looks

## Problems to fix

1. if user deletes account posts are left and trying to go to account is dead end.
