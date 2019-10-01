import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import WebArticle from "./WebArticle";

export default class WebReader extends Component {

	render() {
		console.log("WebReader", "rendering");
		if (this.props.data) {
			return (
				<View style={styles.container}>
					{/*<WebView source={{uri: 'https://www.misya.info/ricetta/sformato-di-zucchine.htm'}}*/}
					{/*		 onLoadEnd={event => {this.fetchData('https://www.misya.info/ricetta/sformato-di-zucchine.htm')}}/>*/}
					{
						this.props.data.map((item, index) => {
							return (
								<View style={styles.article} key={index}>
									<WebArticle text={item.text} image={item.image}/>
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
	container: {
	},
	article: {
		paddingStart: 20,
		paddingEnd: 20,
		paddingTop: 20,
		paddingBottom: 20,
		borderRadius: 10
	}
});
