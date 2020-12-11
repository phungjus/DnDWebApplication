export const checkSession = (app) => {

    const url = '/api/users/check-session'

    // const url = "/api/users/login"

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ login: true, user: json.currentUser })
            }
        })
}

export const login = (username, password, handleLogin) => {

    const url = '/api/users/login'

    // const url = "/api/users/login"

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could not login")
            }
        })
        .then(json => {
            handleLogin(json)
        })
}

export const logout = (app) => {

    const url = '/api/users/logout'

    // const url = "/api/users/login"

    fetch(url)
        .then(res => {
            app.setState({
                login: false,
                user: null
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

export const createUser = (username, password, handleCreate) => {

    const url = '/api/user'

    // const url = "/api/users/login"

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            username: username,
            password: password,
            admin: false
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                return res.status
            }
        }).then(res => {
            handleCreate(res)
        })
}