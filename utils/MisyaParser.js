import HTMLParser from './HTMLParser';

module.exports = {
	parse: parse,
};

let parser;

function parse(value) {
	const url = 'https://www.misya.info/search/' + value;
	console.log('Searching for', url);
	return fetch(url)
		.then(search => {
			console.log('Fetched search...');
			return search.text();
		})
		.catch(e => console.error(e))
		.then(text => {
			if (!text) {
				console.warn('No results found...');
				return;
			}
			parser = new HTMLParser(text);
			console.log('Parsing search results...', parser.element);
			const card = parser.getElementByAttribute('class', 'card ricetta');
			const link = card.getValueByAttribute("href");
			return doSearch(link)
		})
		.catch(e => console.error(e));
}

function doSearch(link) {
	console.log("Fetching link", link);
	return fetch(link)
		.then(response => {
			console.log('Fetched data...');
			return response.text();
		})
		.then(text => {
			const parser = new HTMLParser(text);
			console.log('Parsed response', parser.element);
			const instructions = parser.getElementsByAttribute("name", "istruzioni")[1];
			const data = [];
			instructions.element.children.forEach(item => {
				data.push({
					text: item.value.replace("<br />", ""),
					image: item.children[0].attributes['data-src'],
				});
			});
			console.log('Setting data', data);
			return data;
		})
		.catch(e => console.error(e));
}

function getElementsByAttribute(element, attributeName, attributeValue) {
	let results = [];
	return element.attributes && element.attributes[attributeName] && ((attributeValue && element.attributes[attributeName].toLowerCase() !== attributeValue.toLowerCase()) || results.push(element)), element.children.map(function (child) {
		results = results.concat(getElementsByAttribute(child, attributeName, attributeValue));
	}), results;
}

