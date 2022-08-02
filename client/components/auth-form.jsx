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
    this.userRef = React.createRef();
    this.passRef = React.createRef();
    this.timeRef = React.createRef();
    this.regRef = React.createRef();
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
      });
    this.setState({ username: '', password: '', region: '', timeAvailable: '' });
    this.userRef.current.value = '';
    this.passRef.current.value = '';
    this.timeRef.current.value = 'placeholder';
    this.regRef.current.value = 'placeholder';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='mb-3'>
          <label className='form-label' htmlFor="username">
            Username
          </label>
          <input onChange={this.handleChange} ref={this.userRef} placeholder='Username' className='form-control' required autoFocus type="text" name="username" id="username" />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor="password">
            Password
          </label>
          <input onChange={this.handleChange} ref={this.passRef} placeholder='Password' className='form-control' required autoFocus type="password" name="username" id="password" />
        </div>
        <div className='mb-3'>
          <label className='form-label' htmlFor="time-available">
            Time Available
          </label>
          <select onChange={this.handleChange} ref={this.timeRef} className='mt-0 form-select' name="timeAvailable" id="timeAvailable" required>
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
          <select onChange={this.handleChange} ref={this.regRef} className='mt-0 form-select' name="time-available" id="region" placeholder='Select Region'>
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
        <div className='dis-flex just-cent'>
          <button onSubmit={this.handleSubmit} className='btn btn-info btn-lg mt-5' type="submit">Sign Up</button>
        </div>
      </form>
    );
  }

}
