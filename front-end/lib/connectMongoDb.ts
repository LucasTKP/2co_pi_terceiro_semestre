
const { MongoClient, MongoClientOptions, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Lucas:rhzYUJrwd7hLSgtS@2co.04ezp5l.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export function dbConnection() {
  const result = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  return result
  // async function run() {
  //   try {
  //     // Connect the client to the server	(optional starting in v4.7)
  //     await result.connect();
  //     // Send a ping to confirm a successful connection
  //     await result.db("admin").command({ ping: 1 });
  //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
  //   } finally {
  //     // Ensures that the client will close when you finish/error
  //     await result.close();
  //   }
  // }
}



