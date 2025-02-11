/*
 * == BSD2 LICENSE ==
 * Copyright (c) 2014, Tidepool Project
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the associated License, which is identical to the BSD 2-Clause
 * License as published by the Open Source Initiative at opensource.org.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the License for more details.
 *
 * You should have received a copy of the License along with this program; if
 * not, you can obtain one from Tidepool Project at tidepool.org.
 * == BSD2 LICENSE ==
 */

var React = require('react');

var config = require('../config');

var Login = React.createClass({
  propTypes: {
    disabled: React.PropTypes.bool.isRequired,
    errorMessage: React.PropTypes.string,
    forgotPasswordUrl: React.PropTypes.string.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    onLogin: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div className="Login">
        <form className="Login-form">
          <div className="Login-input">
            <input className="form-control" ref="username" placeholder="Email"/>
          </div>
          <div className="Login-input">
            <input className="form-control" ref="password" placeholder="Password" type="password"/>
          </div>
          <div className="Login-actions">
            <div className="Login-actionsLeft">
              <div className="Login-remember">
                <input type="checkbox" ref="remember" id="remember"/>
                <label htmlFor="remember">Remember me</label>
              </div>
              <div className="Login-forgot">{this.renderForgotPasswordLink()}</div>
            </div>
            <div className="Login-actionsRight">
              {this.renderButton()}
            </div>
          </div>
          <div className="Login-error">{this.renderError()}</div>
        </form>
      </div>
    );
  },

  renderForgotPasswordLink: function() {
    return (
      <a href={this.props.forgotPasswordUrl} target="_blank">
        {'Forgot your password?'}
      </a>
    );
  },

  renderButton: function() {
    var text = 'Login';

    if (this.props.isFetching) {
      text = 'Logging in...';
    }

    return (
      <button type="submit"
        className="Login-button"
        onClick={this.handleLogin}
        disabled={this.props.isFetching || this.props.disabled}>
        {text}
      </button>
    );
  },

  handleLogin: function(e) {
    e.preventDefault();
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var remember = this.refs.remember.checked;

    this.props.onLogin(
      {username: username, password: password},
      {remember: remember}
    );
  },

  renderError: function() {
    if (!this.props.errorMessage) {
      return null;
    }

    return <span>{this.props.errorMessage}</span>;
  }
});

module.exports = Login;
