import React, {Component} from "react";
import {ActivityIndicator, BackHandler, Button, Dimensions, StyleSheet, View} from "react-native";
import * as WebReader from "../utils/WebReader";
import RecipeContainer from "./recipe/RecipeContainer";
import SearchList from "./search/SearchList";

export default class MainContent extends Component {

	state = {
		search: null,
		recipe: null,
		loading: false
	};

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
		BackHandler.addEventListener('hardwareBackPress', () => {
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
			return true;
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
				<View style={styles.buttonStart}>
					<Button onPress={this.onVoiceRead} title={"Start"}/>
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

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingBottom: 50,
		paddingStart: 20,
		paddingEnd: 20
	},
	section: {},
	spinner: {
		height: Dimensions.get("screen").height,
		justifyContent: "center"
	},
	buttonStart: {
		height: Dimensions.get("screen").height,
		justifyContent: "flex-end",
		paddingBottom: 50
	}
});
