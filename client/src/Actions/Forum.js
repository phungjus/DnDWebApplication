export const getPosts = (setForumPosts) => {

    const url = 'http://localhost:5000/api/posts'

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

            setForumPosts(listOfPosts)

        })

}

export const addPosts = (post, setForumPosts, forumPosts) => {

    const url = 'http://localhost:5000/api/posts'

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
            return res.json()
        } else {
            console.log("Error: Couldn't Add Post")
        }
    })
    .then(json => {
        setForumPosts([json, ...forumPosts])
    })
    .catch(error => {
        console.log(error)
    })

}
