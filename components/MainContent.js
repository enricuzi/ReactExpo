import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import VoiceReader from "./VoiceReader";
import SearchList from "./search/SearchList";
import TextSpeech from "./TextSpeech";
import * as WebReader from "../utils/WebReader";
import RecipeContainer from "./recipe/RecipeContainer";

export default class MainContent extends Component {
	TAG = "MainContent";

	state = {
		search: [],
		recipe: null
	};

	onVoiceRead = value => {
		console.log("Voice read...", this.constructor.name);
		WebReader.search(value).then(data => {
			this.setState({
				search: data,
			});
		});
	};

	onSearchItemSelected = value => {
		console.log("Items chosen", value);
		// WebReader.recipe(value).then(data => {
		// 	this.setState({
		// 		recipe: data
		// 	})
		// })
	};

	render() {
		console.log(this.TAG, "rendering");
		return (
			<View style={styles.container}>

				<View style={styles.section}>
					<RecipeContainer data={this.state.recipe}/>
				</View>

				<View style={styles.section}>
					<SearchList data={this.state.search} onItemSelected={this.onSearchItemSelected.bind(this)}/>
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
	container: {
		paddingTop: 50,
		paddingBottom: 50
	},
	section: {}
});
