/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	ActivityIndicator,
//    ToolbarAndroid,
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoadingIndicator from './../components/LoadingIndicator';

import { sessionGenerate, sessionEncrypt, sessionDecrypt } from './../actions/index';

class RsaView extends Component {
    constructor(props) {
    	super(props);

    	this._bits = 1024;
    	this._exp = '10001';

    	this.state = {
    		keyN: '',
    		keyD: '',
    		plainText: '',
    		encryptedText: '',
    		decryptedText: '',
    		loadingText: 'Loading...',
    		loadingEnabled: false
    	};

    }
	
	_handleSessionGenerateDone(success) {
		//console.log('SESSION_GENERATE_DONE');
		//console.log(this.props.session);
		this.setState({keyN: this.props.session.n, keyD: this.props.session.d, encryptedText: '', decryptedText: '', loadingEnabled: false});
		this.setState({loadingEnabled: false});
	} 

	_handleGenerateKeyButtonPress() {
		/*
		this.setState({isBusy: true});
		setTimeout(() => {
			this.setState({isBusy: false});
		}, 3000);
		*/
		this.setState({loadingEnabled: true, loadingText: 'Generating Keys...'});
		this.props.sessionGenerate(this._handleSessionGenerateDone.bind(this));
	}

	_handleSessionEncryptDone(success, encryptedText) {
		this.setState({encryptedText: encryptedText, loadingEnabled: false});
	}

	_handleEncryptButtonPress() {
		if (!this.state.plainText) return;
		
		this.setState({loadingEnabled: true, loadingText: 'Encrypting Text...'})
		this.props.sessionEncrypt(this.state.plainText, this._handleSessionEncryptDone.bind(this));
	}
	
	_handleSessionDecryptDone(success, decryptedText) {
		this.setState({decryptedText: decryptedText, loadingEnabled: false});
	}

	_handleDecryptButtonPress() {
		if (!this.state.encryptedText) return;

		this.setState({loadingEnabled: true, loadingText: 'Decrypting Text...'});
		this.props.sessionDecrypt(this.state.encryptedText, this._handleSessionDecryptDone.bind(this));
	}

    render() {
        return (
		<View>
		{/*
				<ToolbarAndroid style={{ height: 56 }} title="AES CRYPTOGRAPHY TOOL" />
		*/}
				<ScrollView style={styles.container}>
					<Text>Public Key:</Text>
                    <TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top'}} multiline={true} value={this.state.keyN.toUpperCase()} />
					<Text style={{ marginTop: 10 }}>Private Key:</Text>
                    <TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top', marginBottom: 10 }} multiline={true} value={this.state.keyD.toUpperCase()} />
                    <Button title="GENERATE KEY" onPress={() => this._handleGenerateKeyButtonPress()} />
					<Text style={{ marginTop: 10 }}>Text To Encrypt:</Text>
                    <TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top', marginBottom: 10 }} multiline={true} value={this.state.plainText} onChangeText={(value) => this.setState({plainText: value})} />
                    <Button style={ { marginTop: 10 } } title="ENCRYPT" onPress={this._handleEncryptButtonPress.bind(this)} />
					<Text style={{ marginTop: 10 }}>Encrypted Text:</Text>
                    <TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top', marginBottom: 10 }} multiline={true} value={this.state.encryptedText.toUpperCase()} />
                    <Button style={ {marginTop: 10 } } title="DECRYPT" onPress={this._handleDecryptButtonPress.bind(this)} />
					<Text style={{ marginTop: 10 }}>Decrypted Text:</Text>
                    <TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top', marginBottom: 30 }} multiline={true} value={this.state.decryptedText}  />
                </ScrollView>
				<LoadingIndicator visible={this.state.loadingEnabled} text={this.state.loadingText} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		//flex: 1,
		//marginTop: 30,
		padding: 10,
		//justifyContent: 'center',
		//alignItems: 'center',
		backgroundColor: '#F5FCFF',
		height: '100%',
		width: '100%'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

function mapStateToProps(state) {
	return {
		session: state.session
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		sessionGenerate: sessionGenerate,
		sessionEncrypt: sessionEncrypt,
		sessionDecrypt: sessionDecrypt
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(RsaView);
