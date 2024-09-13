const path = require('path');
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const connection = require('./config/connection');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

// MongoDB connection setup using MongoClient
const uri = process.env.MONGODB_URI || "mongodb+srv://root:<db_password>@cluster0.5jsp7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    // Connect the client to the MongoDB server
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

// Middleware for parsing request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files (React build folder) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

// Apollo Server setup
const apolloServer = new ApolloServer({ typeDefs, resolvers });

connection.once('open', async () => {
  await apolloServer.start();
  app.use('/graphql', expressMiddleware(apolloServer, {
    context: authMiddleware,
  }));

  app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
    console.log(`Apollo GraphQL playground available at http://localhost:${PORT}/graphql`);
  });
});

// Start MongoDB connection
connectDB().catch(console.dir);

