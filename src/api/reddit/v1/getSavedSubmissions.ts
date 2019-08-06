import { Comment, Submission } from "snoowrap";
import { rMe } from "../../../config/r";

// Get saved user posts
async function getSavedSubmissions(
  search: string
): Promise<(Comment | Submission)[]> {
  try {
    const savedContent = await rMe.getMe().getSavedContent();
    const allSavedContent = await savedContent.fetchAll();
    // Get all saved content urls
    const filteredContent: (Comment | Submission)[] = allSavedContent.filter(
      (submission: Submission) => {
        if (submission.title) {
          if (submission.title.includes(search)) {
            return submission;
          }
        }
      }
    );
    return filteredContent;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default getSavedSubmissions;
