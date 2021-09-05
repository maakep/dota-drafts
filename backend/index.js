const path = require("path");
const express = require("express");
const { MongoClient } = require("mongodb");
const CronJob = require("cron").CronJob;

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("That ain't right");
});

/* - - - - - */

const mongoKey = process.env.mongokey || require("./secrets.js");
const client = new MongoClient(mongoKey);

let draftsCache = [];

refreshCache();
// every second hour
const cacheRefreshJob = new CronJob(
  "0 0 */2 * * *",
  () => {
    refreshCache();
  },
  null,
  true
);

async function refreshCache() {
  await client.connect();
  const db = client.db("dota");
  const collection = db.collection("comps");
  const findAll = collection.find({});
  const res = await findAll.toArray();
  draftsCache = res;
  console.log(draftsCache);
  client.close();
}

/* - - - - - */

app.get("/", (req, res) => {
  res.status(200).sendFile("index.html", {
    root: path.resolve(__dirname + "/.."),
  });
});

app.get("*.js", (req, res) => {
  res.status(200).sendFile(req.path, {
    root: path.resolve(__dirname + "/.."),
  });
});

app.get("/drafts", (req, res) => {
  res.status(200).json(draftsCache);
});

app.get("/:draftId", (req, res) => {
  const { draftId } = req.params;
  const draft = draftsCache.find((x) => x.title == draftId || x._id == draftId);
  res.status(draft == undefined ? 404 : 200).send(draft);
});

app.post("/draft", async (req, res) => {
  const { pos1, pos2, pos3, pos4, pos5, title, description } = req.body;
  const draft = {
    pos1,
    pos2,
    pos3,
    pos4,
    pos5,
    title,
    description,
  };

  if (anyUndefined([pos1, pos2, pos3, pos4, pos5, title])) {
    return res.sendStatus(400);
  }

  await client.connect();

  const db = client.db("dota");
  var comps = db.collection("comps");
  const r = await comps.insertOne(draft);

  await client.close();

  if (r.acknowledged) {
    draftsCache.push({
      ...draft,
      _id: r.insertedId,
    });
  }

  res.status(r.acknowledged ? 200 : 500).json({ id: r.insertedId });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});

async function setupDatabaseAndCollections() {
  const db = await client.db("dota");
  db.collection();
  await client.connect();
  const comp = await db.createCollection("comps");
  await client.close();
}

function anyUndefined(array) {
  return array.indexOf(undefined) != -1 || array.indexOf(null) != -1;
}
