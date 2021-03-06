const path = require('path');
const fs = require('fs');
const express = require('express');
const { MongoClient } = require('mongodb');
const CronJob = require('cron').CronJob;

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { App } = require('../frontend/src/app');
const { StaticRouter } = require('react-router-dom');
const { ServerStyleSheet, StyleSheetManager } = require('styled-components');
const { heroes } = require('../frontend/src/lib/hero-lib');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('../../public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("That ain't right");
});

/* - - - - - */

const html = fs.readFileSync(
  path.resolve(__dirname, '../../index.html'),
  'utf8',
);

/* - - - - - */

const mongoKey = process.env.mongokey || eval(`require('../secrets.js')`);
const client = new MongoClient(mongoKey);

let draftsCache = [];

refreshCache();
// every second hour
const cacheRefreshJob = new CronJob(
  '0 0 */2 * * *',
  () => {
    refreshCache();
  },
  null,
  true,
);

async function refreshCache() {
  await client.connect();
  const db = client.db('dota');
  const collection = db.collection('comps');
  const findAll = collection.find({});
  const res = await findAll.toArray();
  draftsCache = res;
  console.log(draftsCache);
  client.close();
}

/* - - - - - */

app.get('*.(js|ttf)', (req, res) => {
  res.status(200).sendFile(req.path, {
    root: path.resolve(__dirname + '/../..'),
  });
});

app.get('/api/drafts', (req, res) => {
  res.status(200).json(draftsCache);
});

app.get('/api/drafts/:draftId', (req, res) => {
  const { draftId } = req.params;
  const draft = draftsCache.find((x) => x.title == draftId || x._id == draftId);
  res.status(draft == undefined ? 404 : 200).send(draft);
});

app.post('/api/draft', async (req, res) => {
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

  if (
    anyUndefined([pos1, pos2, pos3, pos4, pos5, title]) ||
    !allValidHeroNames(draft)
  ) {
    return res.sendStatus(400);
  }

  await client.connect();

  const db = client.db('dota');
  var comps = db.collection('comps');
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

app.get('/*', (req, res) => {
  const sheet = new ServerStyleSheet();
  const appString = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <StaticRouter location={req.url} context={{}}>
        <App drafts={draftsCache} />
      </StaticRouter>,
    ),
  );
  const styleTags = sheet.getStyleTags();

  sheet.seal();
  res.status(200).send(
    html
      .replace('<stylegoeshere />', styleTags)
      .replace(
        '<datagoeshere />',
        `<script>window._draftData = ${JSON.stringify(draftsCache)}</script>`,
      )
      .replace('></div>', `>${appString}</div>`),
  );
});

function anyUndefined(array) {
  return array.indexOf(undefined) != -1 || array.indexOf(null) != -1;
}

function allValidHeroNames(draft) {
  const { pos1, pos2, pos3, pos4, pos5 } = draft;
  return [pos1, pos2, pos3, pos4, pos5].every((p) => validateHeroName(p));
}

function validateHeroName(name) {
  return name == '' || heroes.hasOwnProperty(name);
}

/* - - - - */

async function setupDatabaseAndCollections() {
  const db = await client.db('dota');
  db.collection();
  await client.connect();
  const comp = await db.createCollection('comps');
  await client.close();
}

/* - - - - */

app.listen(port, () => {
  console.log('Listening on port ', port);
});
