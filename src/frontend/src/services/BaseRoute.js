import axios from 'axios'
import Config from '../config'

class BaseRoute {
  constructor () {
    this.config = new Config()

    if (!this.config.getBaseUrl()) {
      this.baseUrl = 'http://localhost:8000' + '/api/'
      // throw new Error('Base URL is not defined')
    } else {
      this.baseUrl = this.config.getBaseUrl() + 'api/'
    }
  }

  get (endpoint, params) {
    return axios.get(this.baseUrl + endpoint, { params })
  }

  async post (endpoint, data, headers) {
    return await axios.post(this.baseUrl + endpoint, data, headers).then(response => {
      return {
        data: response.data,
        status: response.status,
        success: response.status === 200
      }
    }).catch(error => {
      return {
        error: error,
        status: error.response.status,
        success: false
      }
    })
  }

  put (endpoint, data, headers) {
    return axios.put(this.baseUrl + endpoint, data, headers)
  }
}

export default BaseRoute