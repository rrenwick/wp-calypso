import { States } from './constants.js';

/**
 * Indicates whether an export activity is in progress.
 *
 * @param  {Object} state    Global state tree
 * @param  {Number} siteId   The ID of the site to check
 * @return {boolean}         true if activity is in progress
 */
export function shouldShowProgress( state, siteId ) {
	const exportingState = state.siteSettings.exporter.exportingState;
	if ( ! exportingState[ siteId ] ) {
		return false;
	}

	return ( exportingState[ siteId ] === States.STARTING ||
		exportingState[ siteId ] === States.EXPORTING );
}

/**
 * Return the exporter UI state as a plain JS object.
 *
 * @param  {Object} state    Global state tree
 * @return {Object}          Exporter UI state
 */
export function getUIState( state ) {
	return state.siteSettings.exporter.ui.toJS();
}
