const apiKey = 'AIzaSyCoZodrrM1C2rnF1S5AaxFKrteJkiNjsbE';

//pour trouver un ID de playlist au hasard dans un Channel Section précis d'une chaîne YT
const randomPlaylist = new Promise((resolve, reject) => {
    resolve(fetch('https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&id=UC-9-kyTW8ZkZNDHQJ6FgpwQ.ob53hcCWxbE&key='+apiKey)
    .then((data) => data.json()) 
    .then((json) => {
        return json.items[0].contentDetails.playlists;
    }).then((playlists) => {
        return playlists[Math.floor(Math.random() * playlists.length)];
    }))
})
randomPlaylist.then((value) => {
console.log(value);
})

//pour avoir le titre de la playlist au hasard de la première étape
const titlePlaylist = new Promise((resolve, reject) => {
    resolve(randomPlaylist.then((playlistId) => {
        //console.log(playlistId);
        fetch('https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id='+playlistId+'&key='+apiKey)
        .then((infoPlaylist) => infoPlaylist.json())
        .then((playlist) => {
        console.log(playlist.items[0].snippet.title)
        return(playlist.items[0].snippet.title)
        })
    }))
})

//pour avoir un titre au hasard dans la playlist et affiche le nom de la vidéo, le nom de la chaîne YT, l'image de miniature et l'id de la vidéo
const randomTrack = new Promise((resolve, reject) => {
    resolve(randomPlaylist.then((playlistId) => {
        fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+playlistId+'&key='+apiKey)
        .then((infoPlaylist) => infoPlaylist.json())
        .then((playlist) => { 
            let randomIndex = Math.floor(Math.random() * playlist.items.length)
            console.log({title: playlist.items[randomIndex].snippet.title, artist:playlist.items[randomIndex].snippet.videoOwnerChannelTitle, cover:playlist.items[randomIndex].snippet.thumbnails.default.url, trackId:playlist.items[randomIndex].snippet.resourceId.videoId});
            return {
                title: playlist.items[randomIndex].snippet.title,
                artist:playlist.items[randomIndex].snippet.videoOwnerChannelTitle,
                cover:playlist.items[randomIndex].snippet.thumbnails.default.url,
                trackId:playlist.items[randomIndex].snippet.resourceId.videoId
            }
        })
    }))
})