import crypto from "crypto";

/**
 * Produces the same hash with the same string.
 * @param str
 */
export default function uuhash(str: string) {
  return crypto
    .createHash("sha1")
    .update(str)
    .digest("hex");
}
