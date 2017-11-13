import RSA from 'react-native-rsa';

const BITS = 1024;
const EXPONENT = '10001';

const rsa = new RSA();

let initialSession = {
	n: '',
	d: ''
};

export default function(state = initialSession, action) {
	switch(action.type) {
		case 'session/GENERATE':
			setTimeout(() => {
				rsa.generate(BITS, EXPONENT);

				let pvKey = rsa.getPrivateString();
				let pvKeyObj = JSON.parse(pvKey);

				state.n = pvKeyObj.n;
				state.d = pvKeyObj.d;

				action.callback(true);
			}, 10);

			break;
		case 'session/ENCRYPT':

			setTimeout(() => {
				let encText = rsa.encrypt(action.plainText);
				action.callback(true, encText);
			}, 10);

			break;
		case 'session/DECRYPT':

			setTimeout(() => {
				let decText = rsa.decrypt(action.encryptedText);
				action.callback(true, decText);
			});

			break;
	}

	return state;
};

