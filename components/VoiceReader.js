import React from "react";

export default class VoiceReader {

	Voice;

	data = {
		recognized: false,
		pitch: false,
		error: false,
		end: false,
		started: false,
		results: [],
		partialResults: [],
	};

	voiceReadCallback = null;

	setState(data) {
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				this.data[key] = data[key]
			}
		}
	}

	get state() {
		return this.data
	}

	set onVoiceRead(callback) {
		this.voiceReadCallback = callback;
	};

	constructor(Voice) {
		this.Voice = Voice;
		Voice.onSpeechStart = e => {
			// started: "√",
			console.log(this.constructor.name, "onSpeechStart: ", e);
			this.setState({
				started: true,
			});
		};
		Voice.onSpeechRecognized = e => {
			console.log(this.constructor.name, "onSpeechRecognized: ", e);
			this.setState({
				recognized: true,
			});
		};
		Voice.onSpeechEnd = e => {
			console.log(this.constructor.name, "onSpeechEnd: ", e);
			this.setState({
				end: true,
			});
		};
		Voice.onSpeechError = e => {
			console.error("onSpeechError: ", e);
			this.setState({
				error: JSON.stringify(e.error),
			});
		};
		Voice.onSpeechResults = e => {
			console.log(this.constructor.name, "onSpeechResults: ", e);
			this.setState({
				results: e.value,
			});
			const params = e.value[0].replace(/ /g, "+");
			this.voiceReadCallback && this.voiceReadCallback(params)
		};
		Voice.onSpeechPartialResults = e => {
			console.log(this.constructor.name, "onSpeechPartialResults: ", e);
			this.setState({
				partialResults: e.value,
			});
		};
		Voice.onSpeechVolumeChanged = e => {
			console.log(this.constructor.name, "onSpeechVolumeChanged: ", e);
			this.setState({
				pitch: e.value,
			});
		};
	}

	start = () => {
		this.setState({
			recognized: "",
			pitch: "",
			error: "",
			started: "",
			results: [],
			partialResults: [],
			end: "",
		});

		return this.Voice.start("it-IT");
	};

	stop = () => {
		return this.Voice.stop();
	};

	cancel = () => {
		return this.Voice.cancel();
	};

	destroy = () => {
		this.setState({
			recognized: "",
			pitch: "",
			error: "",
			started: "",
			results: [],
			partialResults: [],
			end: "",
		});
		return this.Voice.destroy();
	};
}
