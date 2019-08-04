const nano = require("nano")("http://localhost:5984");
export async function initializeCouch() {
  await nano.db.destroy("alice");
  await nano.db.create("alice");
  const alice = nano.use("alice");
  const response = await alice.insert({ happy: true }, "rabbit");
  return response;
}
