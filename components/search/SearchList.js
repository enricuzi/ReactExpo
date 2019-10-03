import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import SearchItem from "./SearchItem";

export default class SearchList extends Component {

	onItemSelected = url => this.props.onItemSelected(url);

	render() {
		if (this.props.data) {
			return (
				<View style={styles.container}>
					{
						this.props.data.map((item, index) => {
							return (
								<View key={index}>
									<SearchItem key={index} onPress={this.onItemSelected.bind(this)} url={item.url} image={item.image} title={item.title}/>
								</View>
							)
						})
					}
				</View>
			)
		}
		return (
			<View>
				<Text>Nessuna ricetta caricata...</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {},
	article: {
		// paddingStart: 20,
		// paddingEnd: 20,
		paddingTop: 20,
		paddingBottom: 20,
		borderRadius: 10
	}
});
