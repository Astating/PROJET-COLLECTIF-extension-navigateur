const apiKey = 'AIzaSyCoZodrrM1C2rnF1S5AaxFKrteJkiNjsbE';

const sectionId = 'UC-9-kyTW8ZkZNDHQJ6FgpwQ._xnVwKbKsP8';

//pour trouver un ID de playlist au hasard dans un Channel Section précis d'une chaîne YT
const randomPlaylist = new Promise((resolve, reject) => {
    resolve(fetch('https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&id='+sectionId+'&key='+apiKey)
    .then((data) => data.json()) 
    .then((json) => {
        return json.items[0].contentDetails.playlists;
    }).then((playlists) => {
        return playlists[Math.floor(Math.random() * playlists.length)];
    }))
})

//pour récupérer le titre de la section
const titleSection = new Promise((resolve, reject) => {
    resolve(fetch('https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&id='+sectionId+'&key='+apiKey)
    .then((data) => data.json()) 
    .then((json) => {
        return json.items[0].snippet.title;
    }))
})

//pour avoir le titre de la playlist au hasard de la première étape
const titlePlaylist = new Promise((resolve, reject) => {
    resolve(randomPlaylist.then((playlistId) => {
        //console.log(playlistId);
        return fetch('https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id='+playlistId+'&key='+apiKey)})
        .then((infoPlaylist) => infoPlaylist.json())
        .then((playlist) => {
        //console.log(playlist.items[0].snippet.title)
        return(playlist.items[0].snippet.title)
        })
    )
})

//pour avoir un titre au hasard dans la playlist et affiche le nom de la vidéo, le nom de la chaîne YT, l'image de miniature et l'id de la vidéo
const randomTrack = new Promise((resolve, reject) => {
    resolve(randomPlaylist.then((playlistId) => {
        return fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+playlistId+'&key='+apiKey)})
        .then((infoPlaylist) => infoPlaylist.json())
        .then((playlist) => { 
            let randomIndex = Math.floor(Math.random() * playlist.items.length)
            return {
                title: playlist.items[randomIndex].snippet.title,
                artist:playlist.items[randomIndex].snippet.videoOwnerChannelTitle,
                artistID:playlist.items[randomIndex].snippet.videoOwnerChannelId,
                cover:playlist.items[randomIndex].snippet.thumbnails.medium.url,
                trackId:playlist.items[randomIndex].snippet.resourceId.videoId
            }
        })
    )
})

//récupérer le nom de la playlist et l'ajouter dans la balise h3 du HTML
titlePlaylist.then((titre) => {
    const h3 = document.querySelector("h3")
    h3.textContent = titre
})

//récupérer le titre de la section de la chaîne et l'ajouter dans le balise p du HTML
titleSection.then((titre) => {
    const p = document.querySelector("p");
    p.textContent = titre;
})

randomTrack.then((trackInfo) => {
    //récupérer la miniature de la vidéo et l'ajouter dans la balise img du HTML
    const img = document.querySelector("img");
    img.src = trackInfo.cover;
    //récupérer le lien de la vidéo et l'ajouter dans la balise a de l'image et du titre de la chanson
    const a = document.querySelector("#song");
    a.href = 'https://www.youtube.com/watch?v='+trackInfo.trackId;
    const titleLink = document.querySelector('#title');
    titleLink.href = a.href;
    randomPlaylist.then((playlistID) => {
        a.href += "&list="+playlistID;
        titleLink.href = a.href;
        const playlistLink = document.querySelector('#playlist-name');
        playlistLink.href = 'https://www.youtube.com/playlist?list='+playlistID;
    })

    //récupérer l'ID de la chaîne et ajouter un lien vers la chaîne
    const ownerID = document.querySelector('#channel');
    ownerID.href = "https://www.youtube.com/channel/"+trackInfo.artistID;

    //récupérer la chaine de la vidéo et l'ajouter dans la balise figcaption id = chaine du HTML
    const channel = document.querySelector("#chaine")
    channel.textContent = trackInfo.artist;
    //récupérer le titre de la vidéo et l'ajouter dans la balise figcaption id = titre du HTML
    const trackName = document.querySelector("#titre");
    trackName.textContent = trackInfo.title;
})