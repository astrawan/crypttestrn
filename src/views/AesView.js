import React, { Component } from 'react';
import {
	Button,
	Picker,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native';

import AES from 'aes-js';

class AesView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			aesKeySize: 32,
			aesKey: '',
			aesPlainText: '',
			aesEncryptedText: '',
			aesDecryptedText: ''
		}
	}

	_handleEncryptButtonPress() {
		let key = this.state.aesKey;
		if (!key) return;

		while(key.length < this.state.aesKeySize) {
			key += String.fromCharCode(0);
		}

		if (key.length > this.state.aesKeySize) {
			key = key.substring(0, this.state.aesKeySize);
		}

		let keyBytes = AES.utils.utf8.toBytes(key);
		let plainTextBytes = AES.utils.utf8.toBytes(this.state.aesPlainText);

		let aesCtr = new AES.ModeOfOperation.ctr(keyBytes, new AES.Counter(5));
		let encryptedTextBytes = aesCtr.encrypt(plainTextBytes);
		let encryptedTextHex = AES.utils.hex.fromBytes(encryptedTextBytes);
		this.setState({aesEncryptedText: encryptedTextHex, aesDecryptedText: ''});
	}

	_handleDecryptButtonPress() {
		let key = this.state.aesKey;
		if (!key) return;

		while (key.length < this.state.aesKeySize) {
			key += String.fromCharCode(0);
		}

		if (key.length > this.state.aesKeySize) {
			key = key.substring(0, this.state.aesKeySize);
		}

		let keyBytes = AES.utils.utf8.toBytes(key);
		let encryptedTextBytes = AES.utils.hex.toBytes(this.state.aesEncryptedText);

		let aesCtr = new AES.ModeOfOperation.ctr(keyBytes, new AES.Counter(5));
		let decryptedTextBytes = aesCtr.decrypt(encryptedTextBytes);
		let decryptedText = AES.utils.utf8.fromBytes(decryptedTextBytes);
		this.setState({ aesDecryptedText: decryptedText });
	}

	render() {
		return (
			<View>
				<ScrollView style={{ padding: 10 }}>
					<Text>Key:</Text>
					<TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top'}} multiline={true} value={this.state.aesKey} maxLength={this.state.aesKeySize} onChangeText={value => this.setState({aesKey: value})} />
					<Text style={{ marginTop: 10 }}>Text To Ecnrypt:</Text>
					<TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top'}} multiline={true} value={this.state.aesPlainText} onChangeText={value => this.setState({aesPlainText: value})} />
					<Picker selectedValue={this.state.aesKeySize} onValueChange={(value, index) => this.setState({aesKeySize: value})}>
						<Picker.Item label="256/32 bytes" value={32} />
						<Picker.Item label="192/16 bytes" value={24} />
						<Picker.Item label="128/8 bytes" value={16} />
					</Picker>
                    <Button title="ENCRYPT" onPress={() => this._handleEncryptButtonPress()} />
					<Text style={{ marginTop:10 }}>Encrypted Text:</Text>
					<TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top', marginBottom: 10 }} multiline={true} value={this.state.aesEncryptedText.toUpperCase()} />
                    <Button style={{ marginTop: 10 }} title="DECRYPT" onPress={() => this._handleDecryptButtonPress()} />
					<Text style={{ marginTop: 10 }}>Decrypted Text:</Text>
					<TextInput style={ { backgroundColor: 'black', color: 'lightgreen', width: '100%', height: 150, borderWidth: 1, textAlignVertical: 'top', marginBottom: 30 }} multiline={true} value={this.state.aesDecryptedText} />
				</ScrollView>
			</View>
		);
	}
}

export default AesView;