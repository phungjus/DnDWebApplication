export const addComments = (comment) => {

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
        } else {
            console.log("Error: Couldn't Add Post")
        }
    })
    .catch(error => {
        console.log(error)
    })

}
