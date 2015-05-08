var React = require('react'),
	SkipButton = require('./skip-button.jsx'),
	SiteStore = require('../stores/site-store'),
	SiteActions = require('../actions/site-actions'),
	Paths = require('../constants/jetpack-start-paths'), 
	SetupProgressActions = require('../actions/setup-progress-actions');

function getJetpackState() {
	return {
		jetpackConfigured: SiteStore.getJetpackConfigured(),
		statsModuleEnabled: SiteStore.isJetpackModuleEnabled('stats')
	};
}

var StatsMonitoringStep = React.createClass({

	componentDidMount: function() {
		SiteStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		SiteStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
    	this.setState(getJetpackState());
  	},

	getInitialState: function() {
		return getJetpackState();
	},

	handleJetpackConnect: function (e) {
		e.preventDefault();

		SiteActions.configureJetpack(Paths.STATS_MONITORING_STEP_SLUG);
	},

	handleEnableStats: function (e) {
		e.preventDefault();

		SetupProgressActions.submitStatsMonitoringStep();
	},

	handleNext: function (e) {
		e.preventDefault();

		SetupProgressActions.completeAndNextStep(Paths.STATS_MONITORING_STEP_SLUG);
	},

	render: function() {
		var component;

		if ( ! this.state.jetpackConfigured ) {
			component = (
				<div>
					Enable Jetpack and connect to WordPress.com for powerful analytics and site monitoring.
					<br /><br />
					<a href="#" className="download-jetpack" onClick={this.handleJetpackConnect}>Enable Jetpack</a>
					<p className="submit">
						<SkipButton />
					</p>
				</div>
			);
		} else if ( ! this.state.statsModuleEnabled ) {
			component = (
				<div>				
					Enable the Stats module to track visitors to your site.
					<br /><br />
					<a href="#" className="button button-primary button-large" onClick={this.handleEnableStats}>Enable Stats Module</a>
					<p className="submit">
						<SkipButton />
					</p>
				</div>
			);
		} else {
			component = (
				<div>
					You have successfully connected Jetpack for stats, monitoring, and more!
					<p className="submit">
						<input type="submit" name="save" className="button button-primary button-large" onClick={this.handleNext} value="Continue" />
					</p>
				</div>
			);
		}

		return (
			<div className="welcome__section" id="welcome__stats">
				<h4>Enable stats and monitoring</h4>
				<div className="welcome__connect">
					{component}
				</div>
			</div>
		);
	}
});

module.exports = StatsMonitoringStep;