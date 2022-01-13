import BaseRoute from '../BaseRoute'

class StoreService extends BaseRoute {
  async getStore (store_id) {
    return await this.get('storepage', {
      store_id,
    })
  }

  async getAllStores () {
    return await this.get('storedashboard')
  }
}

export default StoreService