
export const getPosts = (setForumPosts) => {

    //local
    const url = '/api/posts'

    //deployed
    //const url = '/api/posts'

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {

            const listOfPosts = []

            for (let i = 0; i < json.length; i++) {
                listOfPosts.push(json[i])
            }

            listOfPosts.reverse()
            setForumPosts(listOfPosts)

        })

}

export const addPosts = (post, setForumPosts, forumPosts) => {

    //local
    const url = '/api/posts'

    //deployed
    //const url = '/api/posts'

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(post),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            console.log("Post Successfully Added")
            getPosts(setForumPosts)
        } else {
            console.log("Error: Couldn't Add Post")
        }
    })
    // .then(json => {
    //     getPosts(setForumPosts)
    // })
    .catch(error => {
        console.log(error)
    })

}

export const deletePosts = (pid, setForumPosts) => {

    //local
    const url = '/api/deletePost'

    //deployed
    //const url = '/api/deletePost'

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(pid),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(function(res) {
        if (res.status === 200) {
            getPosts(setForumPosts)
            console.log("Delete Successful")
        } else {
            console.log("Error: Couldn't Delete Post")
        }
    })
    .catch(error => {
        console.log(error)
    })

}