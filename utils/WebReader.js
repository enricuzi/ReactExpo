import * as MisyaParser from "./MisyaParser";

module.exports = {
	search: MisyaParser.parse,
	recipe: MisyaParser.fetchCard
};
