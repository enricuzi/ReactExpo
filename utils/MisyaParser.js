import HTMLReader from "./HTMLReader";

module.exports = {
	parse: search,
	fetchCard: fetchCard
};

function fetchUrl(url, callback) {
	console.log("Fetching url:", url);
	return fetch(url).then(data => data.text()).then(text => callback(text)).catch(e => console.error(e))
}

function search(value) {
	const url = "https://www.misya.info/search/" + value;
	return fetchUrl(url, function (text) {
		if (!text) {
			console.warn("No results found...");
			return;
		}
		const parser = new HTMLReader(text);
		console.log("Parsing search results...");
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

function fetchCard(url) {
	return fetchUrl(url, function (text) {
		const parser = new HTMLReader(text);
		console.log("Parsed response.");
		const instructions = parser.querySelectorAll(".col-md-12", "name", "istruzioni")[0].firstChild;
		const data = [];
		instructions.childNodes.forEach(item => {
			const image = item.querySelector("img");
			data.push({
				text: item.text.replace("<br />", ""),
				image: image.attributes["data-src"],
			});
		});
		console.log("Setting data", data);
		return data;
	})
}
