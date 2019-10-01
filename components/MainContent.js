import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import VoiceReader from './VoiceReader';
import WebReader from './WebReader';
import MisyaParser from '../utils/MisyaParser';
import TextSpeech from './TextSpeech';

export default class MainContent extends Component {
	TAG = 'MainContent';

	state = {
		data: [],
	};

	onVoiceRead = value => {
		console.log('Voice read...', value);
		MisyaParser.parse(value).then(data => {
			this.setState({
				data: data,
			});
		});
	};

	render() {
		console.log(this.TAG, 'rendering');
		return (
			<View style={styles.container}>
				<View style={styles.section}>
					<WebReader data={this.state.data}/>
				</View>

				<View style={styles.section}>
					<VoiceReader onOutput={this.onVoiceRead.bind(this)}/>
				</View>

				<View style={styles.section}>
					<TextSpeech data={this.state.data}/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	section: {},
});
