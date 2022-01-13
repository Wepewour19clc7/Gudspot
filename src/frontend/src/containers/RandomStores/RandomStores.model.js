import StoreService from '../../services/Store'

export class GetAllStores {
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
}