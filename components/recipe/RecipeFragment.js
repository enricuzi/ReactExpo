import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import DynamicImage from "../DynamicImage";

export default class RecipeFragment extends Component {

	render() {
		return (
			<View style={styles.container} onLayout={this.onLayout}>
				<DynamicImage url={this.props.image}/>
				<Text>{this.props.text}</Text>
			</View>
		)
	}

	onLayout = event => {
		this.setState({
			width: event.nativeEvent.layout.width,
			height: event.nativeEvent.layout.height
		})
	}
}

const styles = StyleSheet.create({
	container: {},
	image: {}
});
