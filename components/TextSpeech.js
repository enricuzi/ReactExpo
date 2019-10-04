import React from "react";
import * as Speech from 'expo-speech';

export default class TextSpeech {

	data = {};

	speak = (text) => {
		return new Promise((resolve, reject) => {
			const start = () => {
				console.log(this.constructor.name, "Start speaking:", text);
				this.data.inProgress = true
			};
			const complete = () => {
				console.log(this.constructor.name, "Complete speaking:", text);
				if (this.data.inProgress) {
					this.data.inProgress = false
				}
				resolve()
			};
			const error = e => {
				console.error(this.constructor.name, e);
				reject()
			};

			Speech.speak(text, {
				language: this.data.language || "it",
				pitch: this.data.pitch || 1,
				rate: this.data.rate || 1,
				onStart: start,
				onDone: complete,
				onStopped: complete,
				onError: complete,
			});
		})
	};

	stop = () => Speech.stop();

}
