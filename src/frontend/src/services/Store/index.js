import BaseRoute from '../BaseRoute'
import { getToken } from '../../auth'

class StoreService extends BaseRoute {
  async getStore (store_id) {
    return await this.get('storepage', {
      store_id,
    })
  }

  async getAllStores () {
    return await this.get('storedashboard')
  }

  async review (user_id, store_id, score, description) {
    console.log('token before sending', `Token ${getToken()}`)
    return await this.post('review', {
        user_id, store_id, score, description,
      },
      {
        headers: {
          'Authorization': `Token ${getToken()}`,
        },
      })
  }
}

export default StoreService