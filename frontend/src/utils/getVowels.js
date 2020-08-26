import pairs from "./data.json";
import { shuffle } from "lodash";
export default () => shuffle(Object.keys(pairs));
