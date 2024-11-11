require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // delete any object or documents
    // app.get("/mentors", async (req, res) => {
    //   try {
    //     const result = await eiaDataCollection.deleteOne({
    //       _id: new ObjectId("6406ad63fc13ae5a40000065"),
    //     });

    //     console.log("result ==>", result);

    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error fetching mentors:", error);
    //     res.status(500).send({ message: "Error fetching mentors" });
    //   }
    // });

    // 3. Find documents where the person has skills in both "JavaScript" and "Java."
    app.get("/queryMentors", async (req, res) => {
      try {
        const result = await eiaDataCollection
          .find({ "skills.name": { $all: ["JAVASCRIPT", "JAVA"] } })
          .toArray();

        console.log("result ==>", result);
        res.send(result);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        res.status(500).send({ message: "Error fetching mentors" });
      }
    });

    // // 3. Find all documents where the skill is an empty array.
    // app.get("/queryMentors", async (req, res) => {
    //   try {
    //     const result = await eiaDataCollection
    //       .find({
    //         skills: [],
    //       })
    //       .toArray();

    //     console.log("result ==>", result);
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error fetching mentors:", error);
    //     res.status(500).send({ message: "Error fetching mentors" });
    //   }
    // });

    // // 2. Find documents where the favorite color is either "Maroon" or "Blue."
    // app.get("/queryMentors", async (req, res) => {
    //   try {
    //     const result = await eiaDataCollection
    //       .find({
    //         $or: [{ favoutiteColor: "Maroon" }, { favoutiteColor: "Blue" }],
    //       })
    //       .toArray();

    //     console.log("result ==>", result);
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error fetching mentors:", error);
    //     res.status(500).send({ message: "Error fetching mentors" });
    //   }
    // });

    // 1. Find all documents in the collection where the age is greater than 30, and only return the name and email fields.
    // app.get("/queryMentors", async (req, res) => {
    //   try {
    //     const result = await eiaDataCollection
    //       .find(
    //         {
    //           age: { $gt: 30 },
    //         },
    //         { projection: { name: 1, email: 1 } }
    //       )
    //       .toArray();

    //     console.log("result ==>", result);
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error fetching mentors:", error);
    //     res.status(500).send({ message: "Error fetching mentors" });
    //   }
    // });

    // // Increment object number value
    // app.get("/mentors", async (req, res) => {
    //   try {
    //     const result = await eiaDataCollection.updateOne(
    //       {
    //         _id: new ObjectId("6406ad63fc13ae5a40000065"),
    //       },
    //       { $inc: {"salary": 37} }
    //     );

    //     console.log("result ==>", result);
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error fetching mentors:", error);
    //     res.status(500).send({ message: "Error fetching mentors" });
    //   }
    // });

    // // Change array of object
    // app.get("/mentors", async (req, res) => {
    //   try {
    //     const result = await eiaDataCollection.updateOne(
    //       {
    //         _id: new ObjectId("6406ad63fc13ae5a40000065"),
    //         "education.major": "Art",
    //       },
    //       { $set: { "education.$.major": "CSE" } }
    //     );

    //     console.log("result ==>", result);
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error fetching mentors:", error);
    //     res.status(500).send({ message: "Error fetching mentors" });
    //   }
    // });

    // Get specific data methods
    // app.get("/mentorData", async (req, res) => {
    //   try {
    //     const result = await eiaDataCollection.findOne({
    //       _id: new ObjectId("6406ad63fc13ae5a40000065"),
    //     });

    //     console.log("data ==>", result);
    //     res.send(result);
    //   } catch (error) {
    //     console.error("Error fetching mentors:", error);
    //     res.status(500).send({ message: "Error fetching mentors" });
    //   }
    // });

    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB! 🌴");
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
