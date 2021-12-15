import UserService from '../../services/User'

export class LoginFormModel {
  constructor () {
    this.userService = new UserService()
  }

  async login (data) {
    const { username, password } = data

    return await this.userService.login(username, password)
  }
}