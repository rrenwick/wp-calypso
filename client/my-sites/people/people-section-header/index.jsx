/**
 * External Dependencies
 */
import React from 'react';
import ClassNames from 'classnames';

/**
 * Internal Dependencies
 */
import config from 'config';
import SectionHeader from 'components/section-header';
import Button from 'components/button';
import Gridicon from 'components/gridicon';
import InviteForm from 'my-sites/people/people-section-header/invite-form';

export default React.createClass( {
	displayName: 'PeopleSectionHeader',

	getInitialState() {
		return {
			inviteOpen: false
		};
	},

	openInvite() {
		this.setState( { inviteOpen: true } );
	},

	closeInvite() {
		this.setState( { inviteOpen: false } );
	},

	getProps() {
		if ( this.state.inviteOpen ) {
			return {};
		}
		return this.props;
	},

	renderHeaderContent() {
		if ( ! config.isEnabled( 'manage/add-people' ) ) {
			return null;
		}

		if ( this.state.inviteOpen ) {
			return (
				<div>
					<Gridicon icon="add-outline" size={ 24 } />
					<InviteForm site={ this.props.site } />
					<Button className="is-link" onClick={ this.closeInvite }>
						<Gridicon icon="cross-small" size={ 24 } />
					</Button>
				</div>
			);
		}
		return (
			<Button compact onClick={ this.openInvite }>
				<Gridicon icon="add-outline" size={ 24 } />
			</Button>
		);
	},

	render() {
		return (
			<SectionHeader { ...this.getProps() }
				className={ ClassNames( 'people-section-header', { 'invite-open': this.state.inviteOpen } ) }>
				{ this.renderHeaderContent() }
			</SectionHeader>
		);
	}
 } );
