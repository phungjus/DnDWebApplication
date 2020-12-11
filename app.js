/* server.js for react-express-authentication */
"use strict";

const express = require("express");
// starting the express server
const app = express();
const path = require('path')
const env = process.env.NODE_ENV

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

//cors

const cors = require('cors');
app.use(cors());

// import the mongoose models
const { User } = require("./models/user");
const { Post } = require("./models/post");
const { Character } = require("./models/character")
const { Group } = require("./models/group")
const { Comment } = require("./models/comment")
const { Message } = require("./models/message")
const { Image } = require("./models/image")


// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dgo9nqrxz',
    api_key: '937695347993213',
    api_secret: 'WdsUp7Ln1_P3-dIeZP-4Nl55Nr0'
});

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo')(session)

app.use(express.static(path.join(__dirname, "/client/build")));

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

// IMAGE API CALLS

// a POST route to create an image
app.post("/api/images", multipartMiddleware, mongoChecker, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            var img = new Image({
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
                created_at: new Date(),
            });

            // Save image to the database
            img.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
}); 

// a GET route to get an image
app.get("/api/images/:id", async (req, res) => {
    const id = req.params.id
    const image = await Image.findById(id)
    res.send(image)
});


// FORUM POST API CALLS

// a GET route to get all forum posts 
app.get("/api/posts", mongoChecker, async (req, res) => {

    try {
        const posts = await Post.find().populate({
            path: 'postComments',
            populate: { path: 'userPosted'}
        }).populate('userPosted')
        res.send(posts)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

// a POST route to save a forum post
app.post("/api/posts", mongoChecker, async (req, res) => {

    //Once User Works use this need user id to be passed as parameter:

    const userID = req.body.userPosted

    User.findById(userID).then(async (user) => {
        const post = new Post({
            title: req.body.title,
            post: req.body.post,
            dateTime: req.body.dateTime,
            userPosted: user
        })
        try {
            const result = await post.save()
            res.send(result)
        } catch (error) {
            if (isMongoError(error)) {
                res.status(500).send("Internal Server Error")
            } else {
                res.status(400).send("Bad Request")
            }
        }
    })

})

// a POST route to delete a forum post
app.post('/api/deletePost', mongoChecker, async (req, res) => {

    const pid = req.body.pid

    Post.findByIdAndDelete(pid, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.send("Successful Delete")
        }
    })

})

// a POST route to create a new post
app.post("/user/:id/post", mongoChecker, async (req, res) => {

    // find user
    const id = req.params.id
    const user = await User.findById(id).getFilter()
    // create post
    const post = new Post({
        title: req.body.title,
        post: req.body.post,
        userPosted: user
    })

    try {
        // Save the user
        const newPost = await post.save()
        res.send(newPost)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})


// COMMENT API CALLS

// a POST route to save a new comment 
app.post("/api/comments", mongoChecker, async (req, res) => {

    const comment = req.body.comment
    const pid = req.body.pid
    const dateTime = req.body.dateTime
    const userID = req.body.curUser


    User.findById(userID).then(async (user) => {
        
        const newComment = {
            comment: comment,
            dateTime: dateTime,
            userPosted: user
        }

        Post.findById(pid).then((post) => {
            if (!post) {
                res.status(404).send("Resource Not Found")
            } else {
                post.postComments.push(newComment)
                post.save().then((result) => {
                    res.send(result)
                })
            }
        }).catch((error) => {
            res.status(500).send("Internal Server Error")
        })

    }).catch((error) => {
        res.status(500).send("Internal Server Error")
    })

})

// a POST route to delete a comment

app.post('/api/deleteComment', mongoChecker, async (req, res) => {

    const pid = req.body.pid
    const cid = req.body.cid

    Post.findById(pid).then((post) => {
        if (!post) {
            res.status(404).send("Resource Not Found")
        } else {
            if (!post.postComments.id(cid)) {
                res.status(404).send("Resource Not Found")
            } else {

                post.postComments = post.postComments.filter((comment) => comment._id.toString() !== cid)
                post.save().then((result) => {
                    res.send(result)
                })
            }
        }
    }).catch((error) => {
        res.status(500).send("Internal Server Error")
    })

})

// a POST route to add a comment to a post
app.post("/user/:id/:pid/comment", mongoChecker, async (req, res) => {

    // finduser
    const id = req.params.id
    const pid = req.params.pid
    const user = await User.findById(id)
    const post = await Post.findById(pid)
    const postModel = await Post.findById(id).getFilter()
    const userModel = await User.findById(id).getFilter()
    const comment = new Comment({
        comment: req.body.comment,
        userPosted: userModel
    })

    try {
        // Save the user
        post.userComments.push(comment)
        const result = await comment.save()
        const result1 = await post.save()
        res.send(result)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})



// CHARACTER API CALLS

// a GET route to get a character by ID 
app.get("/api/character/:id", mongoChecker, async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        const c_id = user.character[0]
        const character = await Character.findById(c_id)
        res.send(character)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})

// a PATCH route to add a character to a user
app.patch("/api/character/:id", mongoChecker, async (req, res) => {

    // Create a new character
    const id = req.params.id
    const user = await User.findById(id)
    const character = new Character({
        image: req.body.image,
        name: req.body.name,
        level: req.body.level,
        race: req.body.race,
        class: req.body.class,
        personality: req.body.personality,
        ideals: req.body.ideals,
        bonds: req.body.bonds,
        flaws: req.body.flaws,
        stats: req.body.stats,
        proficiency: req.body.proficiency,
        speed: req.body.speed,
        attack: req.body.attack,
        hp: req.body.hp
    })

    try {
        // Save the user
        user.character.push(character)
        const result1 = await character.save()
        const result = await user.save()
        res.send(result)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})


// USER API CALLS 

// a POST route to add a new user to the database
app.post("/api/user", mongoChecker, async (req, res) => {

    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        admin: req.body.admin
    })

    try {
        // Save the user
        const newUser = await user.save()
        res.send(newUser)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('This username is already in use! Please use a different username.')
        }
    }
})


// GROUP API CALLS 

// a POST route to add a new group to a user
app.post("/api/user/:id/group", mongoChecker, async (req, res) => {

    // find user
    const id = req.params.id
    const user = await User.findById(id)
    const userModel = await User.findById(id).getFilter()
    console.log(user)
    const group = new Group({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        admin: userModel
    })
    try {
        // Save the user
        user.groups.push(group)
        const result1 = await group.save()
        const result = await user.save()
        res.send(result)
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// a POST route for to remove a group from a user
app.post("/api/user/:id/leave/group/:gid", mongoChecker, async (req, res) => {

    // Create a new user
    const id = req.params.id
    const gid = req.params.gid
    const user = await User.findById(id)
    const group = await Group.findById(gid)

    try {
        // Save the user
        user.groups.pull(group._id)
        group.users.pull(user._id)
        const result1 = await group.save()
        const result = await user.save()
        res.send({result: result, result1: result1})
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// a POST route to add a group to a user and add the user to the group
app.post("/api/group/:groupid/add/user/:userid", mongoChecker, async (req, res) => {

    // Create a new user
    const id = req.params.userid
    const groupid = req.params.groupid

    try {
        const user = await User.findById(id)
        const group = await Group.findById(groupid)
        // Save the user
        group.users.push(user._id)
        user.groups.push(group._id)
        const result1 = await group.save()
        const result = await user.save()
        res.send({result: result, result1: result1})
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// a GET route to find all groups a user is in 
app.get("/api/user/:id/group", mongoChecker, async (req, res) => {
    const id = req.params.id

    async function findGroups(user) {
        var groups = []
        for (const groupId of user.groups) {
            const group = await Group.findById(groupId).populate('users').populate('admin').populate('image')
            groups.push(group)
        }
        return groups
    }
    
    try {
        const user = await User.findById(id)
        findGroups(user).then(groups => res.send({groups: groups}))
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// a GET route to find a group by its ID
app.get("/api/group/:id", mongoChecker, async (req, res) => {
    const id = req.params.id

    try {
        const group = await Group.findById(id)
        res.send({group: group})
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// a GET route to find all of the messages in a group
app.get("/api/group/:id/messages", mongoChecker, async (req, res) => {
    const id = req.params.id

    try {
        const group = await Group.findById(id)
        const messages = []
        for (const messageid of group.messages) {
            const message = await Message.findById(messageid).populate('userPosted')
            messages.push(message)
        }
        res.send({ messages: messages})
    } catch {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// a GET call to find all of the users in a group
app.get("/api/group/:id/users", mongoChecker, async (req, res) => {
    const id = req.params.id

    try {
        const group = await Group.findById(id).populate('admin')
        const users = []
        for (const userid of group.users) {
            const user = await User.findById(userid)
            users.push(user)
        }
        res.send({ users: users, admin: group.admin })
    } catch {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

// a POST call to add a message from a user to a group
app.post("/api/group/:gid/user/:uid/message", mongoChecker, async (req, res) => {
    const gid = req.params.gid
    const uid = req.params.uid


    try {
        const user = await User.findById(uid)
        const message = new Message({
            message: req.body.message,
            userPosted: user._id
        })
        const group = await Group.findById(gid)
        group.messages.push(message._id)
        var result = await message.save()
        result = await Message.findById(message._id).populate("userPosted")
        console.log(result)
        const result1 = await group.save()
        res.send({ message: result})
    } catch (error) {
        console.log(error)
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            console.log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})


/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 3600000,
            httpOnly: true
        },
        store: env === 'production' ? new MongoStore({ mongooseConnection: mongoose.connection }) : null
    })
);

// A route to login and create a session
app.post("/api/users/login", mongoChecker, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findByUsernamePassword(username, password)
        .then(user => {
            req.session.user = user._id;
            req.session.username = user.username; 
            res.send({ currentUser: user });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/api/users/logout", mongoChecker, (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session
app.get("/api/users/check-session", mongoChecker, (req, res) => {
    if (req.session.user) {
        User.findById(req.session.user)
            .then(user => {
                res.send({ currentUser: user })
            })
            .catch(error => {
                res.status(400).send()
            });
    } else {
        res.status(401).send();
    }
});


// All routes other than above will go to index.html
app.get("*", (req, res) => {
    const goodPageRoutes = ["/", "/Grouplist", "/Forum", "/group/*"];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404);
    }

    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

module.exports = app;