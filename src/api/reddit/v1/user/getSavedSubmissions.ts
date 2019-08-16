import { Comment, Submission } from "snoowrap";
import { rMe } from "../../../../config/r";
import { TrimmedSubmission } from "../../../../models/TrimmedSubmission";

// Get saved user posts
/**
 * Search for saved submissions.
 *
 * Must be authenticated with a Reddit username/password.
 *
 * @param search
 */
async function getSavedSubmissions(
  search: string
): Promise<(Comment | Submission | TrimmedSubmission)[]> {
  try {
    const savedContent = await rMe.getMe().getSavedContent();
    const allSavedContent = await savedContent.fetchAll();
    // Get all saved content urls
    const filteredContent: (any)[] = allSavedContent.filter(
      (submission: Submission) => {
        if (submission.title) {
          if (submission.title.includes(search)) {
            const trimmedSubmission = TrimmedSubmission.fromSubmission(
              submission
            );
            return trimmedSubmission;
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
