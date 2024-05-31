const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const uri =
  "mongodb+srv://thiagocontato1232:tNBa2wr7XO6EODbm@cluster0.ob27bb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.use(cors());

app.post("/producao", async (req, res) => {
  await client.connect();

  await client.db("admin").command({ ping: 1 });

  const database = client.db("Teste");
  const collection = await database.collection("Pecas").find({}).toArray();

  try {
    res.status(201).send(collection);
  } catch (error) {
    res.status(400).send(error);
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

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

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
