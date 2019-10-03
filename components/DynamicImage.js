import React, {Component} from "react";
import {Dimensions, Image} from "react-native";

export default class DynamicImage extends Component {

	state = {
		height: 0
	};

	componentDidMount() {
		Image.getSize(this.props.url, (width, height) => {
			this.setState({
				height: Dimensions.get("screen").width * height / width
			})
		})
	}

	shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
		return nextProps.url != null
	}

	render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		const width = this.props.width || "100%";
		const height = this.props.height || this.state.height;
		return (
			<Image style={{width: width, height: height}} resizeMode="cover" source={{uri: this.props.url}}/>
		)
	}
}
