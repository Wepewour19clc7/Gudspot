import axios from 'axios'
import Config from '../config'

class BaseRoute {
  constructor () {
    this.config = new Config()

    if (!this.config.getBaseUrl()) {
      throw new Error('Base URL is not defined')
    } else {
      this.baseUrl = this.config.getBaseUrl() + '/api/'
    }
  }

  get (endpoint, params) {
    return axios.get(this.baseUrl + endpoint, { params })
  }

  post (endpoint, data) {
    return axios.post(this.baseUrl + endpoint, data)
  }

  put (endpoint, data) {
    return axios.put(this.baseUrl + endpoint, data)
  }
}

export default BaseRoute