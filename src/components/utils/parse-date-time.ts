
/**
 * Parse date time string to a human readable format. 
 * @param {string} date The date time string to parse.
 * @returns {string} The parsed date time string.
 */
const parseDateTime = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-Us", options);
};
    
export default parseDateTime;