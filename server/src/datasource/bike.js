const {RESTDataSource} = require('apollo-datasource-rest');

class BikeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://kovan-dummy-api.herokuapp.com/';
  }

  async getBikes() {
    const response = await this.get('items');
    return response
  }
}

module.exports = BikeAPI;