import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";

import Voice from "react-native-voice";

export default class VoiceReader extends Component {

	TAG = "VoiceReader";

	state = {
		recognized: "",
		pitch: "",
		error: "",
		end: "",
		started: "",
		results: [],
		partialResults: [],
	};

	constructor(props) {
		super(props);
		Voice.onSpeechStart = this.onSpeechStart;
		Voice.onSpeechRecognized = this.onSpeechRecognized;
		Voice.onSpeechEnd = this.onSpeechEnd;
		Voice.onSpeechError = this.onSpeechError;
		Voice.onSpeechResults = this.onSpeechResults;
		Voice.onSpeechPartialResults = this.onSpeechPartialResults;
		Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
	}

	componentWillUnmount() {
		// Voice.destroy().then(Voice.removeAllListeners);
	}

	componentDidMount() {
		// this.voiceRead("sformato+di+zucchine")
		this.voiceRead("lasagne+al+sugo")
	}

	voiceRead = value => {
		this.props.onOutput(value)
	};

	onSpeechStart = e => {
		// eslint-disable-next-line
		console.log("onSpeechStart: ", e);
		this.setState({
			started: "√",
		});
	};

	onSpeechRecognized = e => {
		// eslint-disable-next-line
		console.log("onSpeechRecognized: ", e);
		this.setState({
			recognized: "√",
		});
	};

	onSpeechEnd = e => {
		// eslint-disable-next-line
		console.log("onSpeechEnd: ", e);
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
		console.log("onSpeechResults: ", e);
		this.setState({
			results: e.value,
		});
		const params = e.value[0].replace(/ /g, "+");
		this.voiceRead(params)
	};

	onSpeechPartialResults = e => {
		// eslint-disable-next-line
		// console.log("onSpeechPartialResults: ", e);
		this.setState({
			partialResults: e.value,
		});
	};

	onSpeechVolumeChanged = e => {
		// eslint-disable-next-line
		// console.log("onSpeechVolumeChanged: ", e);
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

	render() {
		console.log(this.TAG, "rendering");
		return (
			<View style={styles.container}>
				<Text>Voice Reader</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		width: 50,
		height: 50,
	},
	container: {
		// flex: 1,
		// justifyContent: "center",
		// alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	action: {
		textAlign: "center",
		color: "#0000FF",
		marginVertical: 5,
		fontWeight: "bold",
	},
	instructions: {
		textAlign: "center",
		color: "#333333",
		marginBottom: 5,
	},
	stat: {
		textAlign: "center",
		color: "#B0171F",
		marginBottom: 1,
	},
});
