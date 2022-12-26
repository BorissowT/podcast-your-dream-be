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
  }
}

query{
  podcasts{
    id
    title
    linkToApi
  }
}

### Authorisation

mutation { tokenAuth(username:"tim",password:"12345"){ token } }

query{
  me{
    id
    username
  }
}