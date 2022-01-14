import UserService from '../../services/User'

export class ProfileModel {
  constructor () {
    this.userService = new UserService()
  }

  async getUser (user_id) {
    return await this.userService.getUser(user_id)
  }

  async changeInfo (data) {
    const { user_id, name, address, description, avatar } = data

    return await this.userService.changeInfo(user_id, name, address, description, avatar)
  }
}