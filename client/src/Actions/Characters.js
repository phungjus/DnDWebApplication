export const saveCharacter = (userid, character) => {
    // const url = 'http://localhost:5000/api/user/' + userid + '/character'

    // const request = new Request(url, {
    //     method: "patch",
    //     body: JSON.stringify(character),
    //     headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "Content-Type": "application/json"
    //     }
    // })

    // fetch(request)

    // .then(function (res) {
    //     if (res.status === 200) {
    //         console.log("Character Successfully Added")
    //     } else {
    //         console.log("Error: Couldn't Add Character")
    //     }
    // })
    // .catch(error => {
    //     console.log(error)
    // })

    var url = "https://localhost:5000/api/user/" + userid + "/character";

    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer mt0dgHmLJMVQhvjpNXDyA83vA_PxH23Y");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    xhr.send(character);
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