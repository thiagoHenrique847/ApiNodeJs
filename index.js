const express = require("express"); // Importação das bibliotecas
const { MongoClient, ServerApiVersion } = require("mongodb"); // Importação das bibliotecas
const app = express(); // // Importação das bibliotecas
const cors = require("cors"); // Importação das bibliotecas

const uri = process.env.MONGODB_URI; // Importando minha URL de conexão do file .env

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
// Conexão com o banco de dados MONGODB 


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
// Configuração da API

let db;

// Função para conectar com o Banco de Dados MONGODB
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
connectToMongo();


// Url padrão para a API
app.get("/", async (req, res) => {
  try {
    res.status(200).send("Node js");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Url para retornar todos os dados de Peças Pequenas
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

// Url para retornar todos os dados de Peças Médias
app.get("/chart-data-media", async (req, res) => {
  try {
    const collection = await db.collection("PecasMedias").find({}).toArray()
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

// Url para retornar todos os dados de Peças Grandes
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


// Configuração para rodar localmente a API
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
