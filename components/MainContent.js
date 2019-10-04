import React, {Component} from "react";
import {ActivityIndicator, BackHandler, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as WebReader from "../utils/WebReader";
import RecipeContainer from "./recipe/RecipeContainer";
import SearchList from "./search/SearchList";
import TextSpeech from "./TextSpeech";
import VoiceReader from "./VoiceReader";
import Voice from "react-native-voice";

export default class MainContent extends Component {

	state = {
		search: null,
		recipe: null,
		loading: false
	};

	voiceSpeaker;
	voiceReader;

	onVoiceRead = value => {
		console.log(this.constructor.name, "Voice read...");
		this.setState({
			loading: true
		});
		value = "lasagne+al+sugo";
		WebReader.search(value).then(data => {
			this.setState({
				search: data,
				loading: false
			});
		});
	};

	onSearchItemSelected = value => {
		console.log(this.constructor.name, "Items chosen", value);
		this.setState({
			loading: true
		});
		WebReader.recipe(value).then(data => {
			this.setState({
				recipe: data,
				loading: false
			})
		});
	};

	componentDidMount(): void {
		console.log(this.constructor.name, "Component did mount");
		this.voiceSpeaker = new TextSpeech();

		this.voiceReader = new VoiceReader(Voice);
		this.voiceReader.start().catch(e => console.error(e));
		this.voiceReader.onVoiceRead = data => {
			console.log(this.constructor.name, "Voice Reader...", data)
		};

		BackHandler.addEventListener('hardwareBackPress', () => {
			if (!this.state.recipe && !this.state.search) {
				console.log(this.constructor.name, "Exiting app...");
				BackHandler.exitApp();
				return true
			}
			console.log(this.constructor.name, "Clearing view...");
			if (this.state.recipe) {
				this.setState({
					recipe: null
				})
			} else {
				this.setState({
					search: null
				})
			}
			return true
		});
	}

	componentWillUnmount(): void {
		BackHandler.removeEventListener("hardwareBackPress", () => {
			console.log(this.constructor.name, "Removing back event handler")
		})
	}

	render() {
		console.log(this.constructor.name, "rendering", this.state);
		if (this.state.loading) {
			return (
				<View style={styles.spinner}>
					<ActivityIndicator size="large" color="#0000ff"/>
				</View>
			)
		}
		if (!this.state.search && !this.state.recipe) {
			return (
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.buttonArea} onPress={this.onVoiceRead}>
						<Text style={styles.buttonText}>Start</Text>
					</TouchableOpacity>
				</View>
			)
		}
		if (this.state.recipe) {
			return (
				<View style={styles.container}>
					<View style={styles.section}>
						<RecipeContainer data={this.state.recipe}/>
					</View>
				</View>
			)
		}
		return (
			<View style={styles.container}>
				<View style={styles.section}>
					<SearchList data={this.state.search} onItemSelected={this.onSearchItemSelected.bind(this)}/>
				</View>
			</View>
		);
	}
}
const paddingStart = 20;
const paddingEnd = 20;
const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingBottom: 50,
		paddingStart: paddingStart,
		paddingEnd: paddingEnd
	},
	section: {},
	spinner: {
		height: Dimensions.get("screen").height,
		justifyContent: "center"
	},
	buttonContainer: {
		height: Dimensions.get("screen").height,
		justifyContent: "flex-end",
		paddingBottom: 50,
		paddingStart: paddingStart,
		paddingEnd: paddingEnd,
	},
	buttonArea: {
		paddingTop: 40,
		paddingBottom: 40,
		alignItems: "center",
		backgroundColor: "skyblue"
	},
	buttonText: {
		color: "#fff"
	}
});
