import StoreService from '../../services/Store'

export class RandomStoresModel {
  constructor () {
    this.storeService = new StoreService()
  }

  async getStore (data) {
    const { store_id } = data

    return await this.storeService.getStore(store_id)
  }

  async getAllStores () {
    return await this.storeService.getAllStores()
  }

  async getTopStores () {
    return await this.storeService.getTopStores()
  }
}