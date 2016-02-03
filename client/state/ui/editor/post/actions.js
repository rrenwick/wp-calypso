import debugFactory from 'debug';
const debug = debugFactory( 'calypso:ui:editor:post:actions' );

export function setEditingMode( mode, modeTitle, site ) {
	debug( 'setEditingMode', mode, modeTitle, site );
	return { type: 'TODO' };
}

export function startEditingNew( site, postOptions ) {
	debug( 'startEditingNew', site, postOptions );
	return { type: 'TODO' };
}

export function startEditingExisting( site, postID ) {
	debug( 'startEditingExisting', site, postID );
	return { type: 'TODO' };
}

export const EDITING_MODE_EXISTING = 'EXISTING';
export const EDITING_MODE_NEW = 'NEW';
