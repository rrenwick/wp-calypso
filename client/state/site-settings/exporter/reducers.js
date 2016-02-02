/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import Immutable from 'immutable';

/**
 * Internal dependencies
 */
import {
	SET_EXPORT_POST_TYPE,
	EXPORT_START_REQUEST,
	EXPORT_STARTED,
	EXPORT_FAILURE
} from 'state/action-types';

import { States } from './constants';

const initialUIState = Immutable.fromJS( {
	postType: null
} );

/**
 * Tracks the state of the exporter for each site ID
 * @param  {Object} state  The current state
 * @param  {Object} action Action object
 * @return {Object}        Updated state
 */
export function exportingState( state = {}, action ) {
	const { type, siteId } = action;

	switch ( type ) {
		case EXPORT_START_REQUEST:
			return Object.assign( {}, state, {
				[ siteId ]: States.STARTING
			} );
		case EXPORT_STARTED:
			return Object.assign( {}, state, {
				[ siteId ]: States.EXPORTING
			} );
		case EXPORT_FAILURE:
			return Object.assign( {}, state, {
				[ siteId ]: null
			} );
	}

	return state;
}

/**
 * Reducer for managing the exporter UI
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function ui( state = initialUIState, action ) {
	switch ( action.type ) {
		case SET_EXPORT_POST_TYPE:
			return state.set( 'postType', action.postType );
	}

	return state;
}

export default combineReducers( {
	exportingState,
	ui
} );
