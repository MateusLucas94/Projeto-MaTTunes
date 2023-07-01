import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import '../css/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      nome: '',
      carregando: false,
      logado: false,
    };
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit() {
    const { nome } = this.state;
    this.setState({
      carregando: true,
    });
    await createUser({ name: nome });
    this.setState({
      carregando: false,
      logado: true,
    });
  }

  render() {
    const { nome, carregando, logado } = this.state;
    if (logado === true) {
      return <Redirect to="/search" />;
    }
    return (
      <div className="login-container">
        <div className="body-container" data-testid="page-login">
          <h1> MaTTunes</h1>
          <input
            name="nome"
            onChange={ this.handleChange }
            value={ nome }
            type="text"
            data-testid="login-name-input"
          />
          <button
            disabled={ nome.length <= 2 }
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.handleSubmit }
          >
            Login
          </button>
          {carregando === true ? <Carregando /> : ''}
        </div>
      </div>
    );
  }
}

export default Login;
