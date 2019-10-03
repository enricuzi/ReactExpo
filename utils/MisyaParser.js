import HTMLReader from "./HTMLReader";

class MisyaParser {

	fetchUrl(url, callback) {
		console.log(this.constructor.name, "Fetching url:", url);
		return fetch(url).then(data => data.text()).then(text => callback(text)).catch(e => console.error(e))
	}

	static search(value) {
		const url = "https://www.misya.info/search/" + value;
		const misyaParser = new MisyaParser();
		return misyaParser.fetchUrl(url, function (text) {
			if (!text) {
				console.warn(misyaParser.constructor.name, "No results found...");
				return;
			}
			const parser = new HTMLReader(text);
			console.log(misyaParser.constructor.name, "Parsing search results...");
			const cards = parser.querySelectorAll(".card.ricetta");
			const data = [];
			if (cards.length) {
				cards.forEach(card => {
					const link = card.querySelectorAll("a")[1];
					const image = card.querySelector("img");
					const item = {
						url: link.attributes.href,
						image: image.attributes["data-src"],
						title: link.text
					};
					data.push(item);
				});
				return data
			}
			return []
		})
	}

	static fetchCard(url) {
		const misyaParser = new MisyaParser();
		return misyaParser.fetchUrl(url, function (text) {
			const parser = new HTMLReader(text);
			console.log(misyaParser.constructor.name, "Parsed response.");
			const response = {
				title: parser.querySelector("h1").text
			};
			const instructions = parser.querySelectorAll(".col-md-12", "name", "istruzioni")[0].querySelector("div");
			const data = [];
			instructions.childNodes.forEach(item => {
				const image = item.querySelector("img");
				data.push({
					text: item.text.replace("<br />", ""),
					image: image != null ? image.attributes["data-src"] : "",
				});
			});
			response.data = data;
			console.log(misyaParser.constructor.name, "Setting data", response);
			return response;
		})
	}
}

export const search = MisyaParser.search;
export const recipe = MisyaParser.fetchCard;
