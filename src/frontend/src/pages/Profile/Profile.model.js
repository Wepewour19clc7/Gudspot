import UserService from '../../services/User'

export class ProfileModel {
  constructor () {
    this.userService = new UserService()
  }

  async getUser (data) {
    const { user_id } = data

    return await this.userService.getUser(user_id)
  }
}