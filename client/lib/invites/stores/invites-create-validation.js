/**
 * Internal dependencies
 */
import { createReducerStore } from 'lib/store';
import { reducer, initialState } from 'lib/invites/reducers/invites-create-validation';

const InvitesCreateValidationStore = createReducerStore( reducer, initialState );

InvitesCreateValidationStore.getInvite = ( siteId, usernamesOrEmails ) => InvitesCreateValidationStore.get().getIn( [ 'list', siteId, usernamesOrEmails ] );
InvitesCreateValidationStore.getInviteError = ( siteId, usernamesOrEmails ) => InvitesCreateValidationStore.get().getIn( [ 'errors', siteId, usernamesOrEmails ] );

export default InvitesCreateValidationStore;
