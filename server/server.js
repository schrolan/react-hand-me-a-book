const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/react-hand-me-a-book', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');

  // Start Apollo Server
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();

  // Apollo Server middleware for GraphQL endpoint
  app.use('/graphql', expressMiddleware(apolloServer, {
    context: authMiddleware,
  }));

  // Serve the React app for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });

  // Start the Express server
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
    console.log(`Apollo GraphQL playground available at http://localhost:${PORT}/graphql`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
