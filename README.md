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