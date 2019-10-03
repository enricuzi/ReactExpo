import React from "react";
import {StyleSheet, Text, View} from "react-native";

import Voice from "react-native-voice";

export default class VoiceReader {

	data = {
		recognized: "",
		pitch: "",
		error: "",
		end: "",
		started: "",
		results: [],
		partialResults: [],
	};

	setState (data) {
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				this.data[key] = data[key]
			}
		}
	}

	get state () {
		return this.data
	}

	constructor() {
		Voice.onSpeechStart = this.onSpeechStart;
		Voice.onSpeechRecognized = this.onSpeechRecognized;
		Voice.onSpeechEnd = this.onSpeechEnd;
		Voice.onSpeechError = this.onSpeechError;
		Voice.onSpeechResults = this.onSpeechResults;
		Voice.onSpeechPartialResults = this.onSpeechPartialResults;
		Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
	}

	voiceRead = value => {
		return value || "lasagne+al+sugo"
	};

	onSpeechStart = e => {
		// eslint-disable-next-line
		console.log(this.constructor.name, "onSpeechStart: ", e);
		this.setState({
			started: "√",
		});
	};

	onSpeechRecognized = e => {
		// eslint-disable-next-line
		console.log(this.constructor.name, "onSpeechRecognized: ", e);
		this.setState({
			recognized: "√",
		});
	};

	onSpeechEnd = e => {
		// eslint-disable-next-line
		console.log(this.constructor.name, "onSpeechEnd: ", e);
		this.setState({
			end: "√",
		});
	};

	onSpeechError = e => {
		// eslint-disable-next-line
		console.error("onSpeechError: ", e);
		this.setState({
			error: JSON.stringify(e.error),
		});
	};

	onSpeechResults = e => {
		// eslint-disable-next-line
		console.log(this.constructor.name, "onSpeechResults: ", e);
		this.setState({
			results: e.value,
		});
		const params = e.value[0].replace(/ /g, "+");
		this.voiceRead(params)
	};

	onSpeechPartialResults = e => {
		// eslint-disable-next-line
		// console.log(this.constructor.name, "onSpeechPartialResults: ", e);
		this.setState({
			partialResults: e.value,
		});
	};

	onSpeechVolumeChanged = e => {
		// eslint-disable-next-line
		// console.log(this.constructor.name, "onSpeechVolumeChanged: ", e);
		this.setState({
			pitch: e.value,
		});
	};

	_startRecognizing = async () => {
		this.setState({
			recognized: "",
			pitch: "",
			error: "",
			started: "",
			results: [],
			partialResults: [],
			end: "",
		});

		try {
			await Voice.start("it-IT");
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
	};

	_stopRecognizing = async () => {
		try {
			await Voice.stop();
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
	};

	_cancelRecognizing = async () => {
		try {
			await Voice.cancel();
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
	};

	_destroyRecognizer = async () => {
		try {
			await Voice.destroy();
		} catch (e) {
			//eslint-disable-next-line
			console.error(e);
		}
		this.setState({
			recognized: "",
			pitch: "",
			error: "",
			started: "",
			results: [],
			partialResults: [],
			end: "",
		});
	};
}
