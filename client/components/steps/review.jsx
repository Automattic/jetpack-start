var React = require('react'),
	Button = require('@automattic/dops-components/client/components/button'),
	SiteStore = require('stores/site-store'),
	Dashicon = require('../dashicon'),
	WelcomeSection = require('../page/container');

function getSiteState() {
	return {
		site_title: SiteStore.getTitle()
	};
}

var AdvancedSettingsStep = React.createClass({

	getInitialState: function() {
		return getSiteState();
	},

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState(getSiteState());
	},

	render: function() {
		return (
			<WelcomeSection id="welcome__review">
				<h1>Let&apos;s launch <em>{this.state.site_title}</em></h1>
				<p className="welcome__callout welcome__review--callout">Great Work!</p>

				<div className="welcome__review-cols">
					<div className="welcome__review-col">
						<ul className="welcome__review-list">
							<li><Dashicon name="yes" /> Navigation and description <a href="#">(edit)</a></li>
							<li><Dashicon name="yes" /> Homepage layout <a href="#">(edit)</a></li>
							<li><Dashicon name="yes" /> <em>Contact Us</em> page <a href="#">(edit)</a></li>
							<li><Dashicon name="yes" /> Jetpack <a href="#">(edit)</a></li>
						</ul>
					</div>

					<div className="welcome__review-col welcome__review-themes">
						<img src={ `${ JPS.base_url }/img/review__themes.png` } />
						<p><Button href={ JPS.steps.advanced_settings.themes_url } primary>Choose a Theme</Button></p>
					</div>
				</div>
			</WelcomeSection>
		);
	}
});

module.exports = AdvancedSettingsStep;