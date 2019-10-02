import React, {Component} from "react";
import {Dimensions, Image, StyleSheet} from "react-native";

export default class DynamicImage extends Component {

	state = {
		width: 0,
		height: 0,
		ratio: 1
	};

	componentDidMount() {
		Image.getSize(this.props.url, (width, height) => {
			this.setState({
				ratio: height / width
			})
		})
	}

	shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
		return nextProps.url != null
	}

	render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Image style={styles.image} source={{uri: this.props.url}}/>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		width: Dimensions.get("window").width - 10,
		height: Dimensions.get("window").width / 3 - 10,
		margin: 5,
		resizeMode: "cover"
	}
});
