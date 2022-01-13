import BaseRoute from '../BaseRoute'

class UserService extends BaseRoute {
  async login (username, password) {
    return await this.post('login', {
      username,
      password,
    })
  }

  async register (email, password, username, type) {
    return await this.post('register', {
      email,
      password,
      username,
      type,
      avatar: '',
      description: '',
    })
  }

  async getUser (user_id) {
    return await this.get('user-info', {
      user_id
    })
  }
}

export default UserService