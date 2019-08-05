import Nano from "nano";
let nano = Nano("http://localhost:5984");
export async function initializeCouch() {
  try {
    await nano.db.get("get_saved_posts");
    await nano.db.destroy("get_saved_posts");
    const created = await nano.db.create("get_saved_posts");
    console.log(created);
    const use = await nano.db.use("get_saved_posts");
  } catch (e) {
    if (e.error === "not_found") {
      const created = await nano.db.create("get_saved_posts");
      console.log(created);
      await nano.db.use("get_saved_posts");
    }
  }
}
