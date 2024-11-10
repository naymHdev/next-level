require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

/// Middle Ware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const uri = process.env.SERVER_URI;
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const eiaDataCollection = client.db("MongoOperation").collection("mentors");

    app.get("/mentors", async (req, res) => {
      try {
        const result = await eiaDataCollection.find().toArray();
        console.log("result__", result);
        res.send(result);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        res.status(500).send({ message: "Error fetching mentors" });
      }
    });    



    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB! 🌴"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hay, Operations Running! 💰");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port} 💣`);
});
