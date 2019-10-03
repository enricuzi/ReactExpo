import HTMLParser from "react-xml-parser";

export default class XMLParser {

	parser = new HTMLParser();

	element;

	constructor(root) {
		if (!root) {
			return console.error("No root for XMLParser");
		}
		if (typeof root === "string") {
			this.element = this._parse(root);
		} else {
			this.element = root;
		}
	}

	getElementsByTagName = tagName => this.element.getElementsByTagName(tagName);

	getElementsByAttribute = (attributeName, attributeValue) => this._getElementsByAttribute(attributeName, attributeValue);

	getElementByAttribute = (attributeName, attributeValue) => this.getElementsByAttribute(attributeName, attributeValue)[0];

	getValueByAttribute = (attributeName) => {
		const result = this.getElementByAttribute(attributeName);
		if (result) {
			return result.element.attributes[attributeName];
		}
		return null
	};

	_parse = text => this.parser.parseFromString(text);

	_getElementsByAttribute = (attributeName, attributeValue, element) => {
		let results = [];
		element = element || this.element;
		return element.attributes && element.attributes[attributeName] && ((attributeValue && element.attributes[attributeName].toLowerCase() !== attributeValue.toLowerCase()) || results.push(new XMLParser(element))), element.children.map(child => {
			results = results.concat(this._getElementsByAttribute(attributeName, attributeValue, child));
		}), results;
	};
}
