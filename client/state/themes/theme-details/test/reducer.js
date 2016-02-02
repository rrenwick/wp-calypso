/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { RECEIVE_THEME_DETAILS } from '../../action-types';
import reducer from '../reducer';

describe( 'reducer', () => {
	it( 'should default to an empty Immutable Map', () => {
		const state = reducer( undefined, {} );

		expect( state.toJS() ).to.be.empty;
	} );

	it( 'should set theme details for the given ID', () => {
		const state = reducer( undefined, {
			type: RECEIVE_THEME_DETAILS,
			themeId: 'mood',
			themeName: 'Mood',
			themeAuthor: 'Automattic'
		} );

		expect( state.get( 'mood' ).toJS() ).to.eql( {
			name: 'Mood',
			author: 'Automattic'
		} );
	} );
} );
