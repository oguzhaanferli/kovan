const jwt = require("jsonwebtoken");
const JWT_SECRET = "secretKey";
const users = require("./users");

module.exports = {
  Query: {
    bikes: (_, __, { dataSources, user }) => {
      if(!user) throw new Error('You are not authenticated!')
      return dataSources.bikeAPI.getBikes();
    },
  },
  Mutation: {
    authenticate: (_, { name, password }) => {
      if (users[name] && users[name].password === password) {
        return jwt.sign({ data: name }, JWT_SECRET, { expiresIn: "3d" });
      } else {
        throw new Error("Invalid credentials");
      }
    }
  }
};