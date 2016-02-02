/**
 * External dependencies
 */
import { Map } from 'immutable';

/**
 * Internal dependencies
 */
import ActionTypes from '../action-types';

export default ( state = Map(), action ) => {
	switch ( action.type ) {
		case ActionTypes.RECEIVE_THEME_DETAILS:
			return state
				.set( action.themeId, Map( {
					name: action.themeName,
					author: action.themeAuthor
				} ) )
	}
	return state;
};
