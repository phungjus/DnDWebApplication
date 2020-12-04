export const login = (username, password, handleLogin) => {

    const url = 'http://localhost:5000/api/users/login'

    // const url = "/api/users/login"

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            email: username,
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
            console.log(json)
            handleLogin(json.currentUser)
        })

}
