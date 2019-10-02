import React, {Component} from "react";
import {Text} from "react-native";

export default class TextSpeech extends Component {

	componentDidMount() {
	}

	render() {
		if (this.props.data) {
		}
		return (
			<Text>Waiting for text...</Text>
		);
	}
}
