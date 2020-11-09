# Starting the App 
This app was made using React. Within the Phase 1 folder, run: \n
	\t npm install \n
	\t npm start \n

We used the following third party libraries: \n
	\t material-ui \n
	\t react-router-dom \n

You can log in to the website with two accounts. To log in as a user: \n
	\t Username: user \n
	\t Password: user \n
To log in as an admin: \n
	\t Username: admin \n
	\t Password: admin \n

# Features

Forum: This is a public space for discussion that all users have access to. You can make your own post, view comments on other posts, or create your own comments. If logged in as an admin, you can also delete forum posts and comments. 

Groups: These are private groups that you can either create or join with a code. The user and admin account are both pre-joined in one group. Within a group you can message other members, view their character sheets, and have access to a dice roller. Currently you can join another premade group with the code ‘aaaa’. Admin accounts have the option to delete users from groups. 

Character Creation: This page allows a user to create their own DND character. This involves describing the character’s name and personality, uploading an image of the character, choosing an alignment, assigning the character’s statistics based on a point buy system, and selecting the character’s race and class. 

Character Sheet: This page allows you to view created characters, and all of the generated statistics that are needed to play DND. You can update the character’s current hit points as they take damage/heal, view all of your character’s modifiers, and keep track of any notes you have throughout gameplay.  (NOTE: The character sheet currently just shows a pre generated character, not the one made on the character creation page, as that will involve saving the character data to the backend). Admins have the option to increase/decrease stats of their player’s characters. 

# Navigating the site

Forums, groups, and character creation can all be accessed as options from the top navigation bar. Clicking the icon in the top right will take you to your generated character sheet if you have created one. 
