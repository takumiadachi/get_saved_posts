import { Comment, Submission } from "snoowrap";
import { rMe2 } from "../../../../config/r";
import { TrimmedSubmission } from "../../../../models/reddit/TrimmedSubmission";

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
    const savedContent = await rMe2.getMe().getSavedContent();
    const allSavedContent = await savedContent.fetchAll();
    // Map all saved content urls based on search query.
    const filteredContent: (TrimmedSubmission)[] = allSavedContent.map(
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
    // Remove nulls
    const endResultContent: (TrimmedSubmission)[] = filteredContent.filter(
      submission => {
        return submission != null;
      }
    );
    return endResultContent;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default getSavedSubmissions;
