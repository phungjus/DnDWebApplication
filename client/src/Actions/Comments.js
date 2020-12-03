import { getPosts } from "./Forum"

export const addComments = (comment, setForumPosts) => {

    //local
    const url = 'http://localhost:5000/api/comments'

    //deployed
    //const url = '/api/comments'

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(comment),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(function (res) {
        if (res.status === 200) {
            console.log("Comment Successfully Added")
            getPosts(setForumPosts)
        } else {
            console.log("Error: Couldn't Add Comment")
        }
    })
    .catch(error => {
        console.log(error)
    })

}

export const deleteComments = (commentInfo, setForumPosts) => {

    //local
    const url = 'http://localhost:5000/api/deleteComment'

    //deployed
    //const url = '/api/deleteComment'

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(commentInfo),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then(function (res) {
        if (res.status === 200) {
            console.log("Comment Successfully Delete")
            getPosts(setForumPosts)
        } else {
            console.log("Error: Couldn't Delete Comment")
        }
    })
    .catch((error) => {
        console.log(error)
    })

}
