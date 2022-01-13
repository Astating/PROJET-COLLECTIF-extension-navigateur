const apiKey = 'AIzaSyCoZodrrM1C2rnF1S5AaxFKrteJkiNjsbE';

//fetch pour avoir une playlist au hasard dans une channel section
fetch('https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&id=UC-9-kyTW8ZkZNDHQJ6FgpwQ.ob53hcCWxbE&key='+apiKey)
    .then((data) => data.json())
    .then((json) => {
        return json.items[0].contentDetails.playlists;
    }).then((playlists) => {
        return playlists[Math.floor(Math.random() * playlists.length)];
    })

//fetch pour avoir le titre de la playlist random
playlist

//fetch pour avoir un titre au hasard avec info dans la playlist (random du premier fetch)
playlistItems
