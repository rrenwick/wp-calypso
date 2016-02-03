/**
 * External dependencies
 */
import debugModule from 'debug';
import localforage from 'localforage';
import msgpack from 'msgpack-lite';

/**
 * Internal dependencies
 */
import { createReduxStore, reducer } from 'state';
import { SERIALIZE, DESERIALIZE } from 'state/action-types'
import config from 'config';

/**
 * Module variables
 */
const debug = debugModule( 'calypso:state' );

export const localforageConfig = {
	name: 'calypso',
	storeName: 'calypso_store',
	description: 'Calypso Storage',
	driver: localforage.INDEXDB
};

function serialize( state ) {
	const unencodedState = reducer( state, { type: SERIALIZE } );
	return msgpack.encode( unencodedState );
}

function deserialize( encodedState ) {
	const state = msgpack.decode( encodedState );
	debug( 'decoded state', state );
	return reducer( state, { type: DESERIALIZE } );
}

function loadInitialState( initialState ) {
	debug( 'loading initial state' );
	if ( initialState === null ) {
		throw new Error( 'no initial state found in localforage' );
	}
	return createReduxStore( deserialize( initialState ) );
}

function loadInitialStateFailed( error ) {
	debug( 'failed to load initial redux-store state', error );
	return createReduxStore();
}

function persistOnChange( reduxStore ) {
	reduxStore.subscribe( function() {
		localforage.setItem( 'redux-state', serialize( reduxStore.getState() ) )
			.catch( ( setError ) => {
				debug( 'failed to set redux-store state', setError );
			} );
	} );
	return reduxStore;
}

export default function createReduxStoreFromPersistedInitialState( reduxStoreReady ) {
	if ( config.isEnabled( 'persist-redux' ) ) {
		localforage.config( localforageConfig );
		localforage.getItem( 'redux-state' )
			.then( loadInitialState )
			.catch( loadInitialStateFailed )
			.then( persistOnChange )
			.then( reduxStoreReady );
	} else {
		debug( 'persist-redux is not enabled, building state from scratch' );
		reduxStoreReady( createReduxStore() );
	}
}

