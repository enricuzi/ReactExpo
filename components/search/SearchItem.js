import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import DynamicImage from "../DynamicImage";

export default class SearchItem extends Component {

	onPressEvent = () => {
		this.props.onPress(this.props.url)
	};

	shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
		return nextProps.image && nextProps.title
	}

	render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<TouchableHighlight onPress={this.onPressEvent}>
				<View style={styles.container}>
					<DynamicImage style={styles.image} url={this.props.image}/>
					<Text style={styles.text}>{this.props.title}</Text>
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		paddingBottom: 20
	},
	image: {},
	text: {}
});
