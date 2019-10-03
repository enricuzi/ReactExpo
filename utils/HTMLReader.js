import HTMLParser from "fast-html-parser";

export default class HTMLReader {

	root = null;

	constructor(text) {
		this.root = HTMLParser.parse(text)
	}

	querySelector = selector => this.root.querySelector(selector);

	querySelectorAll = selector => this.root.querySelectorAll(selector);
}
