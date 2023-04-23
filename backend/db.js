const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();
const collection = firestore.collection('drafts');

function extractData(snapshot) {
  const dataArray = [];
  snapshot.forEach((d) => {
    dataArray.push({ ...d.data(), _id: d.id });
  });

  return dataArray;
}

async function addDraft(obj, draftId) {
  const docRef = draftId ? collection.doc(draftId) : collection.doc();
  await docRef.set(obj);
  return docRef.id;
}

async function loadAllDrafts(version = null) {
  const snapshot = await (version == null
    ? collection.get()
    : collection.where('version', '>=', version).get());
  const data = extractData(snapshot);

  if (data == undefined) {
    return { success: false, status: 500 };
  }

  return data;
}

module.exports = {
  collection,
  extractData,
  addDraft,
  loadAllDrafts,
};
