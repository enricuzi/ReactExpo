import HTMLParser from "fast-html-parser";

export default class HTMLReader {

	root = null;

	constructor(text) {
		this.root = HTMLParser.parse(text)
	}

	querySelector = selector => this.root.querySelector(selector);

	querySelectorAll = (selector, attributeName, attributeValue) => {
		const elements = this.root.querySelectorAll(selector);
		if (!attributeName) {
			return elements
		}
		const results = [];
		elements.forEach(item => {
			const attribute = item.attributes[attributeName];
			if (attribute === attributeValue) {
				results.push(item)
			}
		});
		return results;
	};
}
