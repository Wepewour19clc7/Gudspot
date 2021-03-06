import UserService from '../../services/User'

export class RegisterFormModel {
  constructor () {
    this.userService = new UserService()
  }

  async register (data) {
    const { email, username, password, type } = data

    return await this.userService.register(email, password, username, type)
  }
}