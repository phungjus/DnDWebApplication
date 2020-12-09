export const saveCharacter = (userid, character, next) => {
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
    .then(result => next())
    .catch(error => console.log('error', error));


}


export const getCharacter = (userid, setCharacter, setImage) => {

    const url = 'http://localhost:5000/api/character/' + userid

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                console.log("Could Not Get Character")
            }
        }).then(json => {
            console.log(json)
            setCharacter(json)
            if (json.image !== undefined) {
                getImage(json.image, setImage)
            }
        })
}

// A function to send a POST request with a new image
export const addImage = (form, userid, character, next) => {
    console.log("Attempting to add image...")
    // the URL for the request
    const url = "http://localhost:5000/api/images";

    // The data we are going to send in our request
    const imageData = new FormData(form);

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json()
            } else {
                // If server couldn't add the image, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                console.log("FAILURE")
            }
        }).then(json => {
            character.image = json._id
            saveCharacter(userid, character, next)
        })
        .catch(error => {
            console.log(error);
        });
};

export const getImage = (id, setImage) => {
    console.log("Getting image")
    // the URL for the request
    const url = "http://localhost:5000/api/images/" + id

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get images");
            }
        })
        .then(image => {
            // the resolved promise with the JSON body
            setImage(image.image_url)
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateStats = (id, stats) => {
    const url = "http://localhost:5000/api/stats/" + id

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: stats,
    redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}