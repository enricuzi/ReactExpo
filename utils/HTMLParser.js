import XMLParser from 'react-xml-parser';

export default class HTMLParser {

	parser = new XMLParser();

	element;

	constructor(root) {
		if (!root) {
			return console.error('No root for HTMLParser');
		}
		if (typeof root === 'string') {
			this.element = this.parse(root);
		} else {
			this.element = root;
		}
	}

	parse = text => this.parser.parseFromString(text);

	getElementsByAttribute = (attributeName, attributeValue) => this._getElementsByAttribute(attributeName, attributeValue);

	getElementByAttribute = (attributeName, attributeValue) => this.getElementsByAttribute(attributeName, attributeValue)[0];

	getValueByAttribute = (attributeName) => {
		const result = this.getElementByAttribute(attributeName);
		if (result) {
			return result.element.attributes[attributeName];
		}
		return null
	};

	_getElementsByAttribute = (attributeName, attributeValue, element) => {
		let results = [];
		element = element || this.element;
		return element.attributes && element.attributes[attributeName] && ((attributeValue && element.attributes[attributeName].toLowerCase() !== attributeValue.toLowerCase()) || results.push(new HTMLParser(element))), element.children.map(child => {
			results = results.concat(this._getElementsByAttribute(attributeName, attributeValue, child));
		}), results;
	};
}
