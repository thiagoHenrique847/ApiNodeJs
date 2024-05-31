const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const uri =
  "mongodb+srv://thiagocontato1232:tNBa2wr7XO6EODbm@cluster0.ob27bb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

async function connectDb(){
  try {
    await mongoose.connect(uri)
    console.log("Sucesso");
  } catch (error) {
    console.log("Error", error);
  }
}
connectDb()

app.use(cors());

app.post("/", async (req, res) => {
  res.send("Teste")
});

app.get("/chart-data-pequena", async (req, res) => {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("AutomationMange");
  const collection = await database
    .collection("PecasPequenas")
    .find({})
    .toArray();

  try {
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/chart-data-media", async (req, res) => {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("AutomationMange");
  const collection = await database
    .collection("PecasMedias")
    .find({})
    .toArray();

  try {
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/chart-data-grande", async (req, res) => {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("AutomationMange");
  const collection = await database
    .collection("PecasGrandes")
    .find({})
    .toArray();

  try {
    res.status(200).send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3100;
app.listen(PORT);

