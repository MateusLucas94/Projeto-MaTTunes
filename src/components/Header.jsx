import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../css/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.pegarUsuario = this.pegarUsuario.bind(this);
    this.state = {
      usuario: {},
      carregando: false,
    };
  }

  // Essa função não aceita await dentro dela
  componentDidMount() {
    this.pegarUsuario();
  }

  async pegarUsuario() {
    this.setState({
      carregando: true,
    });
    const usuarioPego = await getUser();
    this.setState({
      usuario: usuarioPego,
      carregando: false,
    });
  }

  render() {
    const { usuario: { name }, carregando } = this.state;
    return (
      <div className="header-container" data-testid="header-component">
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Musicas Favoritas</Link>
        <br />
        <Link to="/search" data-testid="link-to-search">Buscar</Link>
        <p data-testid="header-user-name">
          { name }
        </p>
        {carregando === true ? <Carregando /> : ''}
      </div>
    );
  }
}

export default Header;
