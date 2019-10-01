import React from 'react';
import MainContent from "./components/MainContent";
import {ScrollView} from "react-native";

export default function App() {
	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<MainContent/>
		</ScrollView>
	);
}
