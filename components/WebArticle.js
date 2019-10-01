import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const {width, height} = Dimensions.get("window");

export default class WebArticle extends Component {

	state = {
		width: 0,
		height: 0,
		ratio: 1
	};

	componentDidMount() {
		Image.getSize(this.props.image, (width, height) => {
			this.setState({
				ratio: height / width
			})
		})
	}

	render() {
		return (
			<View style={styles.container} onLayout={this.onLayout}>
				<Image style={{width: this.state.width, height: this.state.width * this.state.ratio}} source={{uri: this.props.image}}/>
				<Text>{this.props.text}</Text>
			</View>
		)
	}

	onLayout = event => {
		if (!this.state.width) {
			this.setState({
				width: event.nativeEvent.layout.width,
				height: event.nativeEvent.layout.height
			})
		}
	}
}

const styles = StyleSheet.create({
	container: {
	},
	image: {
		flex: 1
	}
});
