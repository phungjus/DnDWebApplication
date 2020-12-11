# Deployed App
Our deployed application can be found at: https://safe-savannah-28556.herokuapp.com/
Example log in information: 
username: user
password: user

username: admin
password: admin

You can also sign up for a new account, but it is only possible to create user accounts this way. 

You can join a new group by entering the code 5fd3e5f179ea1400178d73df in the join group menu (accessed by clicking on the + in the grouplist page).


# Features

Forum: This is a public space for discussion that all users have access to. You can make your own post, view comments on other posts, or create your own comments. If logged in as an admin, you can also delete forum posts and comments. 

Groups: These are private groups that you can either create or join with a code. The user and admin account are both pre-joined in one group. Within a group you can message other members, view their character sheets, and have access to a dice roller. Group admins have the option to delete users from groups.

Character Creation: This page allows a user to create their own DND character. This involves describing the character’s name and personality, uploading an image of the character, choosing an alignment, assigning the character’s statistics based on a point buy system, and selecting the character’s race and class. 

Character Sheet: This page allows you to view created characters, and all of the generated statistics that are needed to play DND. You can update the character’s current hit points as they take damage/heal, view all of your character’s modifiers, and keep track of any notes you have throughout gameplay.  (NOTE: The character sheet currently just shows a pre generated character, not the one made on the character creation page, as that will involve saving the character data to the backend). Admins have the option to increase/decrease stats of their player’s characters. 

# Navigating the site

Forums, groups, and character creation can all be accessed as options from the top navigation bar. Clicking the icon in the top right will take you to your generated character sheet if you have created one. 

# Express Routes 

NOTE: Because we are hosting both a socket and our express server using Heroku, all of our express routes are located in the file app.js. All api calls still work in the expected manner. 

All of the character, group, and forum information is stored in our MongoDB server. Images uploaded by users are stored using Cloudinary. 

Our API calls are split in the following categories: 
Images
Forum Posts
Comments
Characters
Users
Groups
LogIn

API calls: 

CHARACTERS

GET "/api/character/:id"
This call takes a user object ID as a parameter and returns a javascript object containing the information of the character created by that user. (Note: Currently the website only allows one character to be stored per user, but the backend stores all created characters, making it easier in the future to implement allowing multiple characters.)

PATCH "/api/character/:id" 
This call takes a user object ID as a parameter and contains in its body a character javascript object. (This includes all information stored about characters listed in the character.js model, except for the image ID. That is added by image API calls.) It saves the new character object to the character collection. It then finds the correct user object by ID, and adds the character object ID to the list of characters made by that user. 

IMAGES 

POST "/api/images" 
This call takes a form containing file data in its body and uploads the image file to cloudinary, before then creating a new image object containing the url in our database. 

GET "/api/images/:id" 
This call takes an image object ID and returns the javascript object containing the information about the image. 

FORUMS

GET "/api/posts"
This call retrieves all the posts that have been made on the forum. This call will return a list of Post objects.

POST "/api/posts"
This call creates a forum post by taking object which contains the post's title, post's content, the date of the post, and the user ID of the poster. It then looks for the User in the back-end according to the user ID, then creates a Post according to the schema which includes the User found in the backend then saves the new post object to the post collections. It then sends the newly created Post object which contains the title, post content, date & time, and user who made the post.

POST "/api/deletePost"
This call deletes a forum post by taking an object which contains the post's unique id. It accesses the backend and finds the post according to that unique id and deletes it. This route returns 

COMMENTS

POST "api/comments"
This call takes an object that contains the user ID of the poster, the content's of the comment, the ID of the post the comment is being made on and the date and time. It then looks for the User in the back-end according to the user ID, then looks for the Post in the back-end and add's that comment to the array of comments for that Post. It then returns the post with that contains the newly added comment.

POST "/api/deleteComment"
This call takes the post's ID and comment's ID which is passed through the body of the request, it then searches for the post in the post collection in the backend based on the post's ID provided, then it filters the list of comments inside the post object to exclude any comments with the provided comment ID, then saves the post. It then sends a Post object which has removed that comment from the array which represents all comments on that post.

USERS
POST "/api/user"
This call creates a new user in the database. It passes the user inputted username and password through the request body. Mongoose then parses the password and encrypts it before it is stored in the database. Also, Mongoose checks if the username is unique. If it passes the uniqueness requirement, we save the new User into the database.

GROUPS
POST "/api/group/:id/messages"
This call gets all the messages sent in the group with the given groupid ":id". This call gets the group based on the groupid given in the url parameters. Then, it finds all the messages stored by objectId reference in the group object. These messages are pushed onto an array, which is sent over in JSON format.

POST "/api/group/:gid/user/:uid/message"
This call allows a user with _id ":uid" to send a new message to a group with _id ":gid". The message content is found within the request body, as the property "message" (string). 

GET "/api/group/:id/users"
This call gets an array of all users related to the group with _id ":id". This is done by addding all users from the group's users array into a new array. This new array is then sent over JSON.

GET "/api/group/:id/messages"
This call finds all group messages, for the group with _id ":id". This is done by adding all messages from the group's messages array into a new array. This new array is then sent over JSON.

GET "/api/group/:id"
This call finds a group with _id ":id". This is done by invoking the findById mongoose function. 

GET "/api/user/:id/group"
This call gets all groups that the user with _id ":id" is a member of. This is done by finding all groups within the user's groups array. 

POST "/api/user/:id/group"
This call creates a new group that user with the _id ":id" is an admin of. It creates the group by getting name (string), description (string), image (image _id) and admin (user _id) from the request body. It then creates the group and it is added to the user's groups array.

POST "/api/group/:groupid/add/user/:userid"
This call adds the user with _id ":id" to the group with _id ":gid". This is done by adding the user to the group's users array and adding the group to the user's groups array. 

POST "/api/user/:id/leave/group/:gid"
This call removes the user with _id ":id" from the group with _id ":gid". This is done by removing the user from the group's users array and removing the group from the user's groups array. 



LOGIN
POST "/api/users/login"
This call allows users to login to their accounts. It does so by looking for a User in the database based on their username and password. Then, it creates a cookie session for that user, which is stored for an hour. If the login was successful, it sends the user object back to the website.

GET "/api/users/check-session"
This call checks if there is a session in the request. If so, it sends that user's information in the result.

GET "/api/users/logout"
This call destroys the current request session.
