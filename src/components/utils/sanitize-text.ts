/**
 * Basic input sanitization
 * @param {string} text The input string to sanitize
 * @returns {string} The sanitized string
 */
const sanitizeText = (text: string) =>
  text.replace(/[^a-zA-Z0-9@._+\-\s]/g, "");

export default sanitizeText;
