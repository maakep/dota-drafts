async function getVersion() {
  const res = await fetch('https://www.dota2.com/datafeed/patchnoteslist');
  const json = await res.json();
  return json.patches.pop().patch_number;
}

module.exports = {
  getVersion,
};
