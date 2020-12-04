export const getGroups = (userid, setGroups) => {

    const url = "http://localhost:5000/api/user/" + userid + "/group"

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            setGroups(json.groups)
        })
}

export const getGroup = (groupid, setGroups) => {
    const url = "http://localhost:5000/api/group/" + groupid

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            setGroups(json.group)
        })
}

export const getUsers = (groupid, setUsers) => {
    const url = "http://localhost:5000/api/group/" + groupid + "/users"

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            setUsers(json.group)
        })
}


export const createGroup = (userid, groupName, groupDescription, setGroups) => {
    const url = "http://localhost:5000/api/user/" + userid + "/group"

    const req = new Request(url, {
        method: "patch",
        body: JSON.stringify({
            name: groupName,
            description: groupDescription
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(req)
        .then(res => {
            if (res.status === 200) {
                return Promise.resolve()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            getGroups(userid, setGroups)
        })
}

export const addGroup = (userid, groupid, setGroups) => {
    const url = "http://localhost:5000/api/group/" + groupid + "/add/user/" + userid

    const req = new Request(url, {
        method: "patch",
        body: JSON.stringify({}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(req)
        .then(res => {
            if (res.status === 200) {
                return Promise.resolve()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            getGroups(userid, setGroups)
        })
}


export const leaveGroup = (userid, groupid, setGroups) => {
    const url = "http://localhost:5000/api/user/" + userid + "/leave/group" + groupid

    const req = new Request(url, {
        method: "patch",
        body: JSON.stringify({}),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(req)
        .then(res => {
            if (res.status === 200) {
                return Promise.resolve()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        })
        .then(json => {
            getGroups(userid, setGroups)
        })
}