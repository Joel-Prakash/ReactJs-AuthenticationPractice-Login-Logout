import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const jsonResponse = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(jsonResponse.jwt_token)
    } else {
      this.onSubmitFailure(jsonResponse.error_msg)
    }
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label
          htmlFor="user-name-input"
          className="user-name-password-input-label"
        >
          USERNAME
        </label>
        <input
          type="text"
          id="user-name-input"
          className="user-name-input"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label
          htmlFor="password-input"
          className="user-name-password-input-label"
        >
          PASSWORD
        </label>
        <input
          type="password"
          id="password-input"
          className="password-input"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showError, errorMsg} = this.state

    return (
      <div to="/login" className="login-form-main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-form-image"
          alt="website login"
        />
        <div className="login-form-sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="website-logo-main"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitForm}>
            <div className="label-input-container">
              {this.renderUserNameField()}
            </div>
            <div className="label-input-container">
              {this.renderPasswordField()}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
