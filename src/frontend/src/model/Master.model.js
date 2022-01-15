import StoreService from '../services/Store'

export class MasterModel {
  constructor () {
    this.storeService = new StoreService()
  }

  async review (data) {
    const { user_id, store_id, score, description } = data

    return await this.storeService.review(user_id, store_id, score, description)
  }

  async getReviews (store_id) {
    return await this.storeService.getReviews(store_id)
  }

  async checkReview (store_id, user_id) {
    return await this.storeService.checkReview(store_id, user_id)
  }

  async checkFollow (store_id, user_id) {
    return await this.storeService.checkFollow(store_id, user_id)
  }

  async follow (store_id, user_id) {
    return await this.storeService.followStore(store_id, user_id)
  }

  async getBlogs (store_id) {
    return await this.storeService.getBlogs(store_id)
  }
}