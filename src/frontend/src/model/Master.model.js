import StoreService from '../services/Store'

export class MasterModel {
  constructor () {
    this.storeService = new StoreService()
  }

  async review (data) {
    const { user_id, store_id, score, description } = data

    return await this.storeService.review(user_id, store_id, score, description)
  }
}