class Config {
  constructor () {
    this.BASE_URL = process.env.REACT_APP_BASE_URL
  }

  getBaseUrl (): any {
    return this.BASE_URL
  }
}

export default Config