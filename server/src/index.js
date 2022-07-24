const { ApolloServer, AuthenticationError } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const BikeAPI = require('./datasource/bike');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secretKey";


const tokenVerify = token => {
  try {
    if (token) {
      token = token.replace('Bearer ', '');
      return jwt.verify(token, JWT_SECRET)
    }
    return null;
  } catch (error) {
    return null;
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bikeAPI: new BikeAPI(),
  }),
  context: ({ req }) => {
    const token = req.headers.authorization;
    return { user: tokenVerify(token) }
  },
  introspection: true,
  playground: true
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
  `);
});