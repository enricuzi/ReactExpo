import XMLParser from "./XMLParser";

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
		const parser = new XMLParser(text);
		console.log("Parsing search results...", parser.element);
		const cards = parser.getElementsByAttribute("class", "card ricetta");
		const data = [];
		if (cards.length) {
			cards.forEach(card => {
				const link = card.getElementsByTagName("a")[1];
				const image = card.getValueByAttribute("data-src");
				data.push({
					url: link.attributes.href,
					image: image,
					title: link.value
				});
			});
			return data
		}
		return []
	})
}

function fetchCard(url) {
	return fetchUrl(url, function (text) {
		const parser = new XMLParser(text);
		console.log("Parsed response", parser.element);
		const instructions = parser.getElementsByAttribute("name", "istruzioni")[1];
		const data = [];
		instructions.element.children.forEach(item => {
			data.push({
				text: item.value.replace("<br />", ""),
				image: item.children[0].attributes["data-src"],
			});
		});
		console.log("Setting data", data);
		return data;
	})
}
