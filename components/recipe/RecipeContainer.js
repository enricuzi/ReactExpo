import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import RecipeFragment from "./RecipeFragment";

export default class RecipeContainer extends Component {

	render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		if (!this.props.data) {
			return (
				<View/>
			)
		}
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.data.title}</Text>
				<View>
					{
						this.props.data.data.map((item, index) => {
							return (
								<View style={styles.fragment} key={index}>
									<RecipeFragment text={item.text} image={item.image}/>
								</View>
							)
						})
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		paddingBottom: 10
	},
	title: {
		paddingTop: 10,
		paddingBottom: 10,
		alignSelf: "center"
	},
	fragment: {
		paddingTop: 20,
		paddingBottom: 20,
		borderRadius: 10
	}
});
