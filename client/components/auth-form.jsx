import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      region: '',
      timeAvailable: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.testProfile = this.testProfile.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
    this.setState({ username: '', password: '', region: '', timeAvailable: '' });
    event.target.reset();
  }

  testProfile(event) {
    this.setState({ username: 'Sample', password: '1234' });
    event.preventDefault();
  }

  render() {

    const { action } = this.props;
    const altBtnText = action === 'sign-in'
      ? 'Sign In'
      : 'Sign Up';

    return (
      <form onSubmit={this.handleSubmit}>
        <div className='mb-3'>
          <label className='form-label' htmlFor="username">
            Username
          </label>
          <input onChange={this.handleChange} value={this.state.username} placeholder='Username' className='form-control' required autoFocus type="text" name="username" id="username" />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor="password">
            Password
          </label>
          <input onChange={this.handleChange} value={this.state.password} placeholder='Password' className='form-control' required autoFocus type="password" name="username" id="password" />
        </div>
      { action === 'sign-up' &&
        <>
        <div className='mb-3'>
          <label className='form-label' htmlFor="time-available">
            Time Available
          </label>
          <select onChange={this.handleChange} className='mt-0 form-select' name="timeAvailable" id="timeAvailable" required>
            <option className='placeholder' value="placeholder">Select Time</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="late-night">Late Night</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor="region">
            Region
          </label>
          <select onChange={this.handleChange} className='mt-0 form-select' name="time-available" id="region" placeholder='Select Region'>
            <option value="placeholder">Select Region</option>
            <option value="1">NA West</option>
            <option value="2">NA East</option>
            <option value="3">SA West</option>
            <option value="4">SA East</option>
            <option value="5">EU West</option>
            <option value="6">EU Central</option>
            <option value="7">EU East</option>
            <option value="8">CIS</option>
            <option value="9">Middle East</option>
            <option value="10">Asia North</option>
            <option value="11">Asia South</option>
            <option value="12">Ocieana</option>
          </select>
        </div>
        </>
  }
        <div className='d-flex justify-content-center'>
          <button className='btn btn-info btn-lg mt-5' type="submit">{altBtnText}</button>
        </div>
        <div className='d-flex justify-content-center'>
          <button onClick={this.testProfile} type="button" className='btn btn-info btn-lg mt-3'>
            Test Profile
          </button>
        </div>
      </form>
    );
  }

}
