# SnapShot-ki
Project 2 for General Assembly SEI

[Live App](https://snapshot-ki.herokuapp.com/)

## About
SnapShot-Ki is an app built using the following Technologies
- express
	- Node.js module used to make full paths and other stuff

- mongoose
	- Node.js module used to create a mongoose database using schema and models

- Multer
	- Node.js module used to upload and store files. I used it to store the uploaded images on disk. Really should use other technology or fully implement multer-s3 to send files to the cloud because heroku is not persistent.

- fs
 - Node.js module used to access and edit the file system of the app

- materializa
 - css framework. first time using it

## Problems

1. if user deletes account pictures are left and trying to go to account is dead end.
2. images need to go to cloud for the app to be persistent with the images
3.
