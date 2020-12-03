export const saveCharacter = (userid, character) => {
    const url = 'http://localhost:5000/user/' + userid + '/character'

    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify(character),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)

    .then(function (res) {
        if (res.status === 200) {
            console.log("Character Successfully Added")
        } else {
            console.log("Error: Couldn't Add Character")
        }
    })
    .catch(error => {
        console.log(error)
    })
}

export const getCharacter = (userid) => {

    const url = 'http://localhost:5000/api/user/' + userid + "/character"

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Character")
            }
        })
}