import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buscarUsuarios = this.buscarUsuarios.bind(this);
    this.state = {
      carregando: false,
      nome: 'Usuário',
      email: 'usuario@usuario.com.br',
      description: 'Aqui terá informações sobre sua descrição!',
      imagemPerfil: '',
    };
  }

  componentDidMount() {
    this.buscarUsuarios();
  }

  handleSubmit(event) {
    event.preventDefault();
    return <Redirect to="/profile/edit" />;
  }

  async buscarUsuarios() {
    const perfilDoUsuario = await getUser();
    console.log(perfilDoUsuario);
    const { name, email, description, image } = perfilDoUsuario;
    const defaultImage = 'https://st4.depositphotos.com/1012074/25277/v/600/depositphotos_252773324-stock-illustration-young-avatar-face-with-sunglasses.jpg';
    this.setState({
      nome: name,
      email,
      description,
      imagemPerfil: !image ? defaultImage : image,
    });
  }

  render() {
    const {
      carregando,
      imagemPerfil,
      nome,
      email,
      description,
    } = this.state;
    return (
      <div>
        {carregando ? <Carregando /> : ''}
        <Header />
        <form data-testid="page-profile">
          <img
            width="100px"
            src={ imagemPerfil }
            alt="Contorno de rosto desenhado com cabelo e óculos escuro"
            data-testid="profile-image"
          />
          <Link to="/profile/edit">
            Editar perfil
          </Link>
          <h4>Nome</h4>
          <p>
            { nome }
          </p>
          <h4>E-mail</h4>
          <p>
            { email }
          </p>
          <h4>Descrição</h4>
          <p>
            { description }
          </p>
          <br />
        </form>
      </div>
    );
  }
}

export default Profile;
