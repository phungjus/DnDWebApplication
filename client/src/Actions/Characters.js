export const saveCharacter = (userid, character) => {
    const url = "http://localhost:5000/api/character/" + userid

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(character);

    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


}


export const getCharacter = (userid, setCharacter) => {

    const url = 'http://localhost:5000/api/character/' + userid

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Forum Posts")
            }
        }).then(json => {
            setCharacter(json)
        })
}