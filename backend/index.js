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
app.use('/public', express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("That ain't right");
});

let draftsCache = [];
let version = null;

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
  res.status(draft == undefined ? 404 : 200).send(draft);
});

app.get('/api/draft/random', (req, res) => {
  const tags = req.query.tags;
  const drafts = draftsCache.filter(
    (x) =>
      x.pos1 != undefined &&
      ((tags != undefined && tags.split(',').some((y) => x.tags.includes(y))) ||
        tags == undefined),
  );
  const draft = drafts[Math.floor(Math.random() * drafts.length)];
  res.status(200).send(draft);
});

app.get('/api/combo/random/:num?', (req, res) => {
  const num = req.params.num;
  const tags = req.query.tags;
  const combos = draftsCache.filter(
    (x) =>
      x.heroes != undefined &&
      (x.heroes.length == num || num == undefined) &&
      ((tags != undefined && tags.split(',').some((y) => x.tags.includes(y))) ||
        tags == undefined),
  );
  const combo = combos[Math.floor(Math.random() * combos.length)];
  res.status(200).send(combo);
});

app.post('/api/draft', async (req, res) => {
  const { pos1, pos2, pos3, pos4, pos5, title, description, tags, heroes } =
    req.body;

  const updateDraftId = req.body.draftId;

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

  if (version == null) {
    version = await dota.getVersion();
  }

  const id = await db.addDraft(
    {
      ...(isCombo ? combo : draft),
      version: version,
    },
    updateDraftId,
  );

  if (id) {
    const obj = {
      ...(isCombo ? combo : draft),
      _id: id,
    };

    if (updateDraftId) {
      const itemIndex = draftsCache.findIndex((x) => x._id == updateDraftId);
      draftsCache = [
        ...draftsCache.slice(0, itemIndex),
        obj,
        ...draftsCache.slice(itemIndex + 1),
      ];
    } else {
      draftsCache.push(obj);
    }
  }

  res.status(id != undefined ? 200 : 500).json({ id: id });
});

app.get('/*', async (req, res) => {
  if (req.url.includes('?ssr')) {
    return res.status(200).send(html);
  }

  if (draftsCache.length == 0) {
    version = await dota.getVersion();
    const drafts = await db.loadAllDrafts(version);
    draftsCache = [...drafts];
  }

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
        `<script>
          window._draftData = ${JSON.stringify(draftsCache)};
          window._patch = '${version}';
        </script>`,
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

function getDrafts(onlyCombos, tags) {}

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
