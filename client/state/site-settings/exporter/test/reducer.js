/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */

import { EXPORT_ADVANCED_SETTINGS_RECEIVE } from 'state/action-types';
import { advancedSettings } from '../reducers';
import {
	SAMPLE_ADVANCED_SETTINGS,
	SAMPLE_ADVANCED_SETTINGS_EMPTY
} from './sample-data';

describe( '#advancedSettings()', () => {
	it( 'should index settings by site ID', () => {
		const state = advancedSettings( null, {
			type: EXPORT_ADVANCED_SETTINGS_RECEIVE,
			siteId: 100658273,
			advancedSettings: SAMPLE_ADVANCED_SETTINGS
		} );

		expect( state ).to.eql( {
			100658273: SAMPLE_ADVANCED_SETTINGS
		} );
	} );

	it( 'should replace known settings for site', () => {
		let state = { 100658273: SAMPLE_ADVANCED_SETTINGS };

		state = advancedSettings( state, {
			type: EXPORT_ADVANCED_SETTINGS_RECEIVE,
			siteId: 100658273,
			advancedSettings: SAMPLE_ADVANCED_SETTINGS_EMPTY
		} );

		expect( state ).to.eql( {
			100658273: SAMPLE_ADVANCED_SETTINGS_EMPTY
		} );
	} );

	it( 'should not replace known settings with other sites', () => {
		let state = { 100658273: SAMPLE_ADVANCED_SETTINGS };

		state = advancedSettings( state, {
			type: EXPORT_ADVANCED_SETTINGS_RECEIVE,
			siteId: 12345,
			advancedSettings: SAMPLE_ADVANCED_SETTINGS_EMPTY
		} );

		expect( state ).to.eql( {
			100658273: SAMPLE_ADVANCED_SETTINGS,
			12345: SAMPLE_ADVANCED_SETTINGS_EMPTY
		} );
	} );
} );
