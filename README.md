# Deployed App
Our deployed application can be found at: https://safe-savannah-28556.herokuapp.com/
Example log in information: 
username: user
password: user

username: admin
password: admin

You can also sign up for a new account, but it is only possible to create user accounts this way. 


# Features

Forum: This is a public space for discussion that all users have access to. You can make your own post, view comments on other posts, or create your own comments. If logged in as an admin, you can also delete forum posts and comments. 

Groups: These are private groups that you can either create or join with a code. The user and admin account are both pre-joined in one group. Within a group you can message other members, view their character sheets, and have access to a dice roller. Currently you can join another premade group with the code ‘aaaa’. Admin accounts have the option to delete users from groups. 

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

Some example API calls: 

CHARACTERS

PATCH "/api/character/:id" 
This call takes a user object ID as a parameter and contains in its body a character javascript object. (This includes all information stored about characters listed in the character.js model, except for the image ID. That is added by image API calls.) It saves the new character object to the character collection. It then finds the correct user object by ID, and adds the character object ID to the list of characters made by that user. 

IMAGES 

POST "/api/images" 
This call takes a form containing file data in its body and uploads the image file to cloudinary, before then creating a new image object containing the url in our database. 

FORUMS

POST "/api/posts"
This call retrieves creates a forum post by taking object which contains the post's title, post's content, the date of the post, and the user ID of the poster. It then looks for the User in the back-end according to the user ID, then creates a Post according to the schema which includes the User found in the backend then saves the new post object to the post collections.

COMMENTS

POST "/api/deleteComment"
This call takes the post's ID and comment's ID which is passed through the body of the request, it then searches for the post in the post collection in the backend based on the post's ID provided, then it filters the list of comments inside the post object to exclude any comments with the provided comment ID, then saves the post.



