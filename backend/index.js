const path = require('path');
const fs = require('fs');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');

const { App } = require('../frontend/src/app');
const { ServerStyleSheet } = require('styled-components');
const { ALL_HEROES } = require('../frontend/src/lib/hero-lib');

const db = require('./db');
const dota = require('./dota');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('../../public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("That ain't right");
});

const draftsCache = [];
let version = new Date();

dota.getVersion().then((x) => {
  version = x;
});
db.loadAllDrafts().then((x) => {
  console.log(x);
  draftsCache.push(...x);
});

const html = fs.readFileSync(
  path.resolve(__dirname, '../../index.html'),
  'utf8',
);

app.get('*.(js|ttf)', (req, res) => {
  res.status(200).sendFile(req.path, {
    root: path.resolve(__dirname + '/../..'),
  });
});

app.get('/api/drafts', (req, res) => {
  res.status(200).json([draftsCache]);
});

app.get('/api/drafts/:draftId', (req, res) => {
  const { draftId } = req.params;
  const draft = draftsCache.find((x) => x.title == draftId || x._id == draftId);
  console.log(draftsCache);
  res.status(draft == undefined ? 404 : 200).send(draft);
});

app.post('/api/draft', async (req, res) => {
  const { pos1, pos2, pos3, pos4, pos5, title, description, tags, heroes } =
    req.body;

  const draft = {
    pos1,
    pos2,
    pos3,
    pos4,
    pos5,
    title,
    description,
    tags,
  };

  const combo = {
    heroes,
    title,
    description,
    tags,
  };

  const isCombo = heroes != undefined;

  if (title == undefined) {
    return res.status(400).send('Missing title');
  }

  if (isCombo && !validateHeroNames(combo.heroes)) {
    return res.status(400).send('Incorrect hero name');
  }

  if (
    !isCombo &&
    (anyUndefined([pos1, pos2, pos3, pos4, pos5]) ||
      !draftValidHeroNames(draft))
  ) {
    return res.status(400).send('Missing position or incorrect hero name');
  }

  const id = await db.addDraft({
    ...(isCombo ? combo : draft),
    version: version,
  });

  if (id) {
    draftsCache.push({
      ...draft,
      _id: id,
    });
  }

  res.status(id != undefined ? 200 : 500).json({ id: id });
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

function draftValidHeroNames(draft) {
  const { pos1, pos2, pos3, pos4, pos5 } = draft;
  return [pos1, pos2, pos3, pos4, pos5].every((p) => validateHeroName(p));
}
function validateHeroNames(listOfheroes) {
  return listOfheroes.every((h) => validateHeroName(h));
}

function validateHeroName(name) {
  return name == '' || ALL_HEROES.hasOwnProperty(name);
}

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
