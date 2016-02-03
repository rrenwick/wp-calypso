/**
 * External dependencies
 */
import { fromJS } from 'immutable';

/**
 * Internal dependencies
 */
import { action as ActionTypes } from 'lib/invites/constants';

const initialState = fromJS( {
	list: {},
	errors: {}
} );

const reducer = ( state = initialState, payload ) => {
	const { action } = payload;
	switch ( action.type ) {
		case ActionTypes.RECEIVE_CREATE_INVITE_VALIDATION_SUCCESS:
			return state.setIn( [ 'list', action.siteId ], true );
		case ActionTypes.RECEIVE_CREATE_INVITE_VALIDATION_ERROR:
			return state.setIn( [ 'errors', action.siteId ], action.error );
	}
	return state;
}

export { initialState, reducer };
