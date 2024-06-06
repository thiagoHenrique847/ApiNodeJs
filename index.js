const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
// const uri = process.env.MONGODB_URI;
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

let db;

// Connect to MongoDB once at the start
async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    db = client.db("AutomationMange");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit the application if the connection fails
  }
}

// Call the connectToMongo function when the application starts
connectToMongo();

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Node js");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/chart-data-pequena", async (req, res) => {
  try {
    const collection = await db.collection("PecasPequenas").find({}).toArray();
    const lengthCollen = collection.length
    res.status(200).json({
      success: true,
      collection,
      lengthCollen
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/chart-data-media", async (req, res) => {
  try {
    const collection = await db.collection("PecasMedias").find({}).toArray();
    const lengthCollen = collection.length
    res.status(200).json({
      success: true,
      collection,
      lengthCollen
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/chart-data-grande", async (req, res) => {
  try {
    const collection = await db.collection("PecasGrandes").find({}).toArray();
    const lengthCollen = collection.length
    res.status(200).json({
      success: true,
      collection,
      lengthCollen
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3300;

app.listen(
  {
    host: "0.0.0.0",
    port: PORT,
  },
  function () {
    console.log(`Servidor rodando na porta ${PORT}`);
  }
);

async function Delete() {
  try {
    await client.connect();
    const database = client.db("Teste");
    await database.collection("Pecas").deleteMany({});
    console.log("Sucesso");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
// Delete();
