const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3300;

if (!uri) {
  throw new Error('MONGODB_URI environment variable not defined');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Node js");
});

app.get("/chart-data-pequena", async (req, res) => {
  try {
    const database = client.db("AutomationMange");
    const collection = await database.collection("PecasPequenas").find({}).toArray();
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/chart-data-media", async (req, res) => {
  try {
    const database = client.db("AutomationMange");
    const collection = await database.collection("PecasMedias").find({}).toArray();
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/chart-data-grande", async (req, res) => {
  try {
    const database = client.db("AutomationMange");
    const collection = await database.collection("PecasGrandes").find({}).toArray();
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
});

async function startServer() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();

async function Delete() {
  try {
    const database = client.db("Teste");
    await database.collection("Pecas").deleteMany({});
    console.log("Sucesso");
  } catch (err) {
    console.log(err);
  }
}

// Uncomment to use the Delete function
// Delete();
