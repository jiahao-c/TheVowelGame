import pairs from "./data.json";

export default (vowel, word) => pairs[vowel].includes(word);
