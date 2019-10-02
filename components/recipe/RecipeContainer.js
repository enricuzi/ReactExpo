import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import RecipeFragment from "./RecipeFragment";
import Text from "react-native-web/dist/exports/Text";

export default class RecipeContainer extends Component {

	shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
		return nextProps.data && nextProps.data.length > 0
	}

	render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		if (!this.props.data) {
			return (
				<View/>
			)
		}
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.title}</Text>
				{
					this.props.data.map((item, index) => {
						return (
							<View style={styles.fragment} key={index}>
								<RecipeFragment text={item.text} image={item.image}/>
							</View>
						)
					})
				}
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
		paddingBottom: 10
	},
	fragment: {
		paddingStart: 20,
		paddingEnd: 20,
		paddingTop: 20,
		paddingBottom: 20,
		borderRadius: 10
	}
});
