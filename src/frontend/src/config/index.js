class Config {
  constructor () {
    this.BASE_URL = process.env.REACT_APP_BASE_URL
  }

  getBaseUrl (): any {
    console.log(process.env.REACT_APP_BASE_URL)
    return this.BASE_URL
  }
}

export default Config