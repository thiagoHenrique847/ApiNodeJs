const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config(); // to use environment variables from .env file

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

app.use(cors());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process with a failure code
  }
}

connectToDatabase();

app.get("/chart-data-pequena", async (req, res) => {
  try {
    const database = client.db("AutomationMange");
    const collection = await database.collection("PecasPequenas").find({}).toArray();
    console.log("Data from PecasPequenas:", collection);
    res.send(collection);
  } catch (error) {
    console.error("Error fetching data from PecasPequenas:", error);
    return res.status(500).send(error);
  }
});

app.get("/chart-data-media", async (req, res) => {
  try {
    const database = client.db("AutomationMange");
    const collection = await database.collection("PecasMedias").find({}).toArray();
    console.log("Data from PecasMedias:", collection);
    res.status(200).send(collection);
  } catch (error) {
    console.error("Error fetching data from PecasMedias:", error);
    res.status(500).send(error);
  }
});

app.get("/chart-data-grande", async (req, res) => {
  try {
    const database = client.db("AutomationMange");
    const collection = await database.collection("PecasGrandes").find({}).toArray();
    console.log("Data from PecasGrandes:", collection);
    return res.status(200).send(collection);
  } catch (error) {
    console.error("Error fetching data from PecasGrandes:", error);
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
