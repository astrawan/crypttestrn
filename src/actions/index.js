export function sessionGenerate(callback) {
	return {
		type: 'session/GENERATE',
		callback: callback
	};
};

export function sessionEncrypt(plainText, callback) {
	return {
		type: 'session/ENCRYPT',
		plainText: plainText,
		callback: callback
	};
};

export function sessionDecrypt(encryptedText, callback) {
	return {
		type: 'session/DECRYPT',
		encryptedText: encryptedText,
		callback: callback
	};
};