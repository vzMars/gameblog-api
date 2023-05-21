# GameBlog API

The back-end for a full-stack news blog application that allows users to create blog posts and share them with others.

**Link to project:** https://gameblog.vzmars.com/

**Front-End:** https://github.com/vzMars/gameblog

![alt text](https://i.imgur.com/kxlagcO.png)
![alt text](https://i.imgur.com/pCh3anV.png)

## How It's Made:

**Tech used:** TypeScript, Node.js, Express, MongoDB, Passport

The back-end for this application was made using Node.js and Express. This application was organized using the MVC (Model-View-Controller) design pattern. MongoDB was used as the database which stores all the users and their posts. Passport was used for authentication and passwords are hashed using bcrypt and user sessions are stored in MongoDB. There is a Multer middleware that is used to ensure that only images get uploaded by the client and those images are then stored on Cloudinary. I also added an error handler middleware that handles all errors for example if a user is trying to sign up with a username or email that has already been taken the server responds with a 409 Conflict response or if a user is trying to log in and they have inputted incorrect information the server responds with a 401 Unauthorized response.

## Optimizations:

I would like to try using JWTs for authentication instead of using sessions since I've never tried that form of authentication before. I would also add a comment system that lets users comment on blog posts. User roles would be a nice feature to add to this application for example a reader role where these users can only read blog posts and comment on them and a admin/writer role where these users can do everything that a reader can but are also allowed to create new blog posts.

## Lessons Learned:

This was the first application where I used TypeScript and I like how it adds static typing to JavaScript and how it makes code more readable. I also found it useful to use interfaces and used them to define the structure of my User model, Post model, and even the request body for creating a post. I also liked how easy it was to use TypeScript with Node.js/Express and didn't have any trouble setting it up and deploying the application.

## More Projects:

Take a look at these other projects that I have in my portfolio:

**Employee CRM API:** https://github.com/vzMars/employee-crm-api

**ItemPickups:** https://github.com/vzMars/item-pickups

**MangaNotifications:** https://github.com/vzMars/manga-notifications
