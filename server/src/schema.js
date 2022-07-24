const {gql} = require('apollo-server');
const typeDefs = gql`
  type BikeResponse {
    last_updated: String
    ttl: Int
    data: DataModel
    total_count: Int
    nextPage: Boolean
  }

  type DataModel {
    bikes: [Bike]
  }

  type Bike {
    bike_id: ID
    lat: Float
    lon: Float
    is_reserved: Boolean
    is_disabled: Boolean
    vehicle_type: String
    total_bookings: Int
    android: String
    ios: String
  }

  type Query {
    bikes: BikeResponse
  }
  
  type Mutation {
    authenticate(name: String!, password: String!) : String!
  }
`;

module.exports = typeDefs;