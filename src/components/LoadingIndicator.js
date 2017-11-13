import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
	ActivityIndicator, 
	Modal,
	Text, 
	View 
} from 'react-native';

class LoadingIndicator extends Component {

	render() {
		return(
			<Modal animationType="none" transparent={true} visible={this.props.visible} onRequestClose={() => { }}>
				<View style={{
					flex: 1,
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					alignItems: 'center',
					justifyContent: 'center'
				}}>
					<View style={{
						padding: 12,
						backgroundColor: '#000',
						borderColor: 'white',
						borderWidth: 2,
						borderRadius: 8,
						opacity: .8,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<Text style={{
							fontWeight: 'bold',
							color: '#fff',
							textAlign: 'center',
							fontSize: 22
						}}>{this.props.text}</Text>
						<View style={{
							alignItems: 'center',
							justifyContent: 'center',
							padding: 4,
							marginTop: 4
						}}>
							<ActivityIndicator
								animating={true}
								size='large'
								color="#fff"
							/>
						</View>
					</View>
				</View>
			</Modal>

		);
	}

};

LoadingIndicator.propTypes = {
	visible: PropTypes.bool,
	text: PropTypes.string
};

LoadingIndicator.defaultProps = {
	text: 'Loading...',
	visible: false
};

export default LoadingIndicator;
