export const getMessages = (groupid, setMessage) => {

    const url = "/api/group/" + groupid + "/messages"

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            console.log(json)
            setMessage(json.messages)
        })
}

export const addMessage = (groupid, userid, message, socket) => {

    const url = '/api/group/' + groupid + '/user/' + userid + '/message'

    console.log(url)
    console.log(typeof message)
    const req = new Request(url, {
        method: "post",
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
        }).then(json => {
            socket.send(JSON.stringify(json.message))
        })
}