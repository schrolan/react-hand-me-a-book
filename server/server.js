const path = require('path');
const express = require('express');
const cors = require('cors');
const connection = require('./config/connection');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files (React build folder) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  // Serve index.html for all routes to handle client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

// Apollo Server middleware
connection.once('open', async () => {
  await apolloServer.start();

  app.use('/graphql', expressMiddleware(apolloServer, {
    context: authMiddleware,
  }));

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
    console.log(`Apollo GraphQL playground available at http://localhost:${PORT}/graphql`);
  });
});