mutation {
  createUser(username:"admin", email:"admin@gmail.com", password:"12345", isStaff: true) {
    user{
      id
      username
      email
      isStaff
    }
  }
}

mutation {
  createPodcast(title:"test", linkToApi:"https://www.google.com/maps") {
      title
      linkToApi
  }
}

query{
  podcasts{
    id
    title
    linkToApi
  }
}

mutation{
  addPodcastToPlaylist(podcastId: 1, playlistId: 1){
    user{
      id
      username
      email
    }
    podcast{
      id
    	title
    	linkToApi
    }
    playlist{
      id
      title
    }
  }
}

query{
  playlists{
    id
    title
    user{
      id
      username
    }
    podcasts{
      id
      title
    }
  }
}

mutation{
  createTagsCollection(title:"testCollection", tags:["insomnia", "depression", "night"]){
    title,
    tags
  }
}

query{
  tagsCollections{
    id
    title
    user{
      id
      username
    }
    tags
  }
}

### Authorisation

mutation { tokenAuth(username:"tim",password:"12345"){ token } }

{
  "AUTHORIZATION": "JWT <token>"
}

query{
  me{
    id
    username
  }
}