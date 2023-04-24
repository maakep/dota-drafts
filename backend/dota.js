async function getVersion() {
  try {
    const res = await fetch('https://www.dota2.com/datafeed/patchnoteslist');
    const json = await res.json();
    return json.patches.pop().patch_number;
  } catch (e) {
    console.error(e);
    return '7.33';
  }
}

module.exports = {
  getVersion,
};
