const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const uri = process.env.MONGODB_URI;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.use(cors());

app.get("/", async (req, res) => {
  

  try {
    res.status(200).send("Node js");
  } catch (error) {
    res.status(500).send(error);
  }
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

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3300;


app.listen({
  host:"0.0.0.0",
  port:PORT
}, function(){
  console.log(`Servidor rodando na porta ${PORT}`)
})

async function Delete() {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("Teste");
  await database
    .collection("Pecas")
    .deleteMany({})
    .then(() => {
      console.log("Sucesso");
    })
    .catch((err) => console.log(err));
}
// Delete()
