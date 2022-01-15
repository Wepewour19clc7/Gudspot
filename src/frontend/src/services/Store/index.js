import BaseRoute from '../BaseRoute'
import { getToken } from '../../auth'

class StoreService extends BaseRoute {
  async getStore (store_id) {
    return await this.get('storepage', {
      store_id,
    })
  }

  async getTopStores () {
    return await this.get('get-top-follow-store')
  }

  async getAllStores () {
    return await this.get('storedashboard')
  }

  async getReviews (store_id) {
    return await this.get('get-review', {
      store_id,
    })
  }

  async checkReview (store_id, user_id) {
    return await this.get('check-review', {
      store_id,
      user_id,
    })
  }

  async checkFollow (store_id, user_id) {
    return await this.get('check-follow', {
      store_id,
      user_id,
    })
  }

  async follow (store_id, user_id) {
    console.log('token before sending', `Token ${getToken()}`)
    return await this.post('followstore', {
        store_id, user_id
      },
      {
        headers: {
          'Authorization': `Token ${getToken()}`,
        },
      })
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