'use strict';

const WebSocket = require('ws');
let server = require('http').createServer();
let app = require('./app');

// Create web socket server on top of a regular http server
let wss = new WebSocket.Server({

  server: server
});

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"))});
    
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

app.get("/api/posts", mongoChecker, async (req, res) => {

    try {
        const posts = await Post.find().populate({
            path: 'postComments',
            populate: { path: 'userPosted'}
        }).populate('userPosted')

        res.send(posts)
    } catch (error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})

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
            log(error)
            if (isMongoError(error)) {
                res.status(500).send("Internal Server Error")
            } else {
                res.status(400).send("Bad Request")
            }
        }
    })

})

app.post("/api/comments", mongoChecker, async (req, res) => {

    //Once User Works use this need user id to be passed as parameter:

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
                log(post.postComments)
                post.save().then((result) => {
                    res.send(result)
                })
            }
        }).catch((error) => {
            log(error)
            res.status(500).send("Internal Server Error")
        })

    }).catch((error) => {
        log(error)
        res.status(500).send("Internal Server Error")
    })

})

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
        log(error)
        res.status(500).send("Internal Server Error")
    })

})

app.get("/api/character/:id", mongoChecker, async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        const c_id = user.character[0]
        const character = await Character.findById(c_id)
        console.log(character)
        res.send(character)
    } catch (error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})


app.post("/api/user", mongoChecker, async (req, res) => {
    // log(req.body)

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
        console.log(error)
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

app.patch("/api/character/:id", async (req, res) => {

    // Create a new character
    const id = req.params.id
    const user = await User.findById(id)
    console.log(user)
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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.patch("api/stats/:id", async (req, res) => {
    console.log("attempting to patch")
    const id = req.params.id
    const character = await Character.findById("5fd0308f3ead0e5bf9cec3ba")

    character.stats = req.body.stats
    try {
        const result = await character.save()
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

app.get("api/user/:id/character", async (req, res) => {
    const id = req.params.id
    // Validate id
	if (!ObjectID.isValid(id)) {
        res.status(404).send()  // user does not exist
        log("wasn't found!!")
		return; 
	}

	// If id valid, findById
	try {
		const user = await User.findById(id)
		if (!user) {
			res.status(404).send('Resource not found')  // could not find this restaurant
		} else {  
			if (user.character.length === 0) {
                res.send({}) // user has not created a character yet
            }
            res.send(user.character[0])
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

app.get("/api/images/:id", async (req, res) => {
    const id = req.params.id
    const image = await Image.findById(id)
    res.send(image)
});

app.post("/api/user/:id/group", async (req, res) => {

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

app.post("/api/user/:id/leave/group/:gid", async (req, res) => {
    log(req.body)

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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.post("/api/group/:groupid/add/user/:userid", async (req, res) => {
    log(req.body)

    // Create a new user
    const id = req.params.userid
    const groupid = req.params.groupid
    const user = await User.findById(id)
    const group = await Group.findById(groupid)

    try {
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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.get("/api/user/:id/group", mongoChecker, async (req, res) => {
    const id = req.params.id

    async function findGroups(user) {
        var groups = []
        for (const groupId of user.groups) {
            const group = await (await Group.findById(groupId).populate('users')).populate('image').populate('admin')
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
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.get("/api/group/:id", async (req, res) => {
    const id = req.params.id

    try {
        const group = await Group.findById(id)
        res.send({group: group})
    } catch (error) {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.get("/api/group/:id/messages", async (req, res) => {
    const id = req.params.id

    try {
        const group = await Group.findById(id)
        const messages = []
        for (const messageid of group.messages) {
            const message = await Message.findById(messageid).populate('userPosted')
            messages.push(message)
        }
        console.log(messages)
        res.send({ messages: messages})
    } catch {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.get("/api/group/:id/users", async (req, res) => {
    const id = req.params.id

    try {
        const group = await Group.findById(id)
        const users = []
        for (const userid of group.users) {
            const user = await User.findById(userid)
            users.push(user)
        }
        res.send({ users: users})
    } catch {
        if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the student.
        }
    }
})

app.post("/api/group/:gid/user/:uid/message", async (req, res) => {
    console.log("Hellooo")
    const gid = req.params.gid
    const uid = req.params.uid

    console.log("AHHHHHHH")

    try {
        console.log("Trying")
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
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(result));
            }
        });
        res.send({ result: result, result1: result1 })
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

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        },
        store: env === 'production' ? new MongoStore({ mongooseConnection: mongoose.connection }) : null
    })
);

// A route to login and create a session
app.post("/api/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username; // we will later send the email to the browser when checking if someone is logged in through GET /check-session (we will display it on the frontend dashboard. You could however also just send a boolean flag).
            res.send({ currentUser: user });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/api/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
// Also mount the app here
server.on('request', app);

wss.on('connection', function connection(ws) {
    console.log("connected")
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
            console.log(data)
            client.send(data);
      }
    });
  });
});


server.listen(process.env.PORT || 5000, function() {

  console.log(`http/ws server listening on ${process.env.PORT || 5000 }`);
});