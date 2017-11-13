/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
	Dimensions,
	View
} from 'react-native';
import { SceneMap, TabViewAnimated, TabBar } from 'react-native-tab-view';
import NavigationBar from 'react-native-navbar';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import allReducers from './reducers/index';
import RsaView from './views/RsaView';
import AesView from './views/AesView';

const store = createStore(allReducers);

const RsaViewRoute = () => <RsaView  />
const AesViewRoute = () => <AesView />

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			routes: [{
				key: 'rsaView',
				title: 'RSA'
			}, {
				key: 'aesView',
				title: 'AES'
			}]
		};
	}

	componentDidMount() {
	}

	_handleTabIndexChange(index) {
		console.log('TAB_INDEX_CHANGED');
		this.setState({index: index});
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<NavigationBar title={{ title: 'CRYPTOGRAPHY TOOL' }} />
					<TabViewAnimated 
						navigationState={this.state}
						renderScene={
							SceneMap({
								rsaView: RsaViewRoute,
								aesView: AesViewRoute
							})
						}
						renderHeader={props => <TabBar {...props}/>}
						onIndexChange={this._handleTabIndexChange.bind(this)}
						initialLayout={{
							height: 0,
							width: Dimensions.get('window').width
						}}
					/>
				</View>
			</Provider>
		);
	}
};


