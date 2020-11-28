/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();
const path = require('path')

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
// const { Student } = require("./models/student");
const { User } = require("./models/user");
const { Post } = require("./models/post");
const { Character } = require("./models/character")
const { Group } = require("./models/Group")
const { Comment } = require("./models/comment")

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

app.post("/user", async (req, res) => {
    log(req.body)

    // Create a new user
    const user = new User({
        email: req.body.email,
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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.post("/user/:id/post", async (req, res) => {
    log(req.body)

    // Create a new user
    const id = req.params.id
    const user = await User.findById(id).getFilter()
    console.log(user)
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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.patch("/user/:id/character", async (req, res) => {
    log(req.body)

    // Create a new user
    const id = req.params.id
    const user = await User.findById(id)
    console.log(user)
    const character = new Character({
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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.patch("/user/:id/group", async (req, res) => {
    log(req.body)

    // Create a new user
    const id = req.params.id
    const user = await User.findById(id)
    const userModel = await User.findById(id).getFilter()
    console.log(user)
    const group = new Group({
        name: req.body.name,
        description: req.body.description,
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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.post("/user/:id/:pid/comment", async (req, res) => {
    log(req.body)

    // Create a new user
    const id = req.params.id
    const pid = req.params.pid
    const user = await User.findById(id)
    const post = await Post.findById(pid)
    const postModel = await Post.findById(id).getFilter()
    const userModel = await User.findById(id).getFilter()
    console.log(user)
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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})


// // middleware for mongo connection error for routes that need it
// const mongoChecker = (req, res, next) => {
//     // check mongoose connection established.
//     if (mongoose.connection.readyState != 1) {
//         log('Issue with mongoose connection')
//         res.status(500).send('Internal server error')
//         return;
//     } else {
//         next()  
//     }   
// }

// // Middleware for authentication of resources
// const authenticate = (req, res, next) => {
//     if (req.session.user) {
//         User.findById(req.session.user).then((user) => {
//             if (!user) {
//                 return Promise.reject()
//             } else {
//                 req.user = user
//                 next()
//             }
//         }).catch((error) => {
//             res.status(401).send("Unauthorized")
//         })
//     } else {
//         res.status(401).send("Unauthorized")
//     }
// }


// /*** Session handling **************************************/
// // Create a session and session cookie
// app.use(
//     session({
//         secret: "our hardcoded secret",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             expires: 60000,
//             httpOnly: true
//         }
//     })
// );

// // A route to login and create a session
// app.post("/users/login", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     // log(email, password);
//     // Use the static method on the User model to find a user
//     // by their email and password
//     User.findByEmailPassword(email, password)
//         .then(user => {
//             // Add the user's id to the session.
//             // We can check later if this exists to ensure we are logged in.
//             req.session.user = user._id;
//             req.session.email = user.email; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
//             res.send({ currentUser: user.email });
//         })
//         .catch(error => {
//             res.status(400).send()
//         });
// });

// // A route to logout a user
// app.get("/users/logout", (req, res) => {
//     // Remove the session
//     req.session.destroy(error => {
//         if (error) {
//             res.status(500).send(error);
//         } else {
//             res.send()
//         }
//     });
// });

// // A route to check if a user is logged in on the session
// app.get("/users/check-session", (req, res) => {
//     if (req.session.user) {
//         res.send({ currentUser: req.session.email });
//     } else {
//         res.status(401).send();
//     }
// });

// /*********************************************************/

// /*** API Routes below ************************************/
// // User API Route
// app.post('/api/users', mongoChecker, async (req, res) => {
    // log(req.body)

    // // Create a new user
    // const user = new User({
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // try {
    //     // Save the user
    //     const newUser = await user.save()
    //     res.send(newUser)
    // } catch (error) {
    //     if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
    //         res.status(500).send('Internal server error')
    //     } else {
    //         log(error)
    //         res.status(400).send('Bad Request') // bad request for changing the student.
    //     }
    // }
// })

// /** Student resource routes **/
// // a POST route to *create* a student
// app.post('/api/students', mongoChecker, authenticate, async (req, res) => {
//     log(`Adding student ${req.body.name}, created by user ${req.user._id}`)

//     // Create a new student using the Student mongoose model
//     const student = new Student({
//         name: req.body.name,
//         year: req.body.year,
//         creator: req.user._id // creator id from the authenticate middleware
//     })


//     // Save student to the database
//     // async-await version:
//     try {
//         const result = await student.save() 
//         res.send(result)
//     } catch(error) {
//         log(error) // log server error to the console, not to the client.
//         if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
//             res.status(500).send('Internal server error')
//         } else {
//             res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
//         }
//     }
// })

// // a GET route to get all students
// app.get('/api/students', mongoChecker, authenticate, async (req, res) => {

//     // Get the students
//     try {
//         const students = await Student.find({creator: req.user._id})
//         // res.send(students) // just the array
//         res.send({ students }) // can wrap students in object if want to add more properties
//     } catch(error) {
//         log(error)
//         res.status(500).send("Internal Server Error")
//     }

// })

// // other student API routes can go here...
// // ...

// /*** Webpage routes below **********************************/
// // Serve the build
// app.use(express.static(path.join(__dirname, "/client/build")));

// // All routes other than above will go to index.html
// app.get("*", (req, res) => {
//     // check for page routes that we expect in the frontend to provide correct status code.
//     const goodPageRoutes = ["/", "/login", "/dashboard"];
//     if (!goodPageRoutes.includes(req.url)) {
//         // if url not in expected page routes, set status to 404.
//         res.status(404);
//     }

//     // send index.html
//     res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});