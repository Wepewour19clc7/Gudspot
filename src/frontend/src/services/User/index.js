import BaseRoute from '../BaseRoute'

class UserService extends BaseRoute {
  async login (username, password) {
    return await this.post('login/', {
      username,
      password,
    })
  }

  async register (email, password, username) {
    return await this.post('register/', {
      email,
      password,
      username,
    })
  }
}

export default UserService