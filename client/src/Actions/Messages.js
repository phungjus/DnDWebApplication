export const getMessages = (groupid, setMessage) => {

    const url = "http://localhost:5000/api/group/" + groupid + "/messages"

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            setMessage(json.groups)
        })
}

export const addMessage = (groupid, userid, message, setMessage) => {

    const url = "http://localhost:5000/api/group/" + groupid + "/user/"  + userid + "/messages"

    const req = new Request(url, {
        method: "patch",
        body: JSON.stringify({
            message: message
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(req)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            setMessage(json.groups)
        })
}