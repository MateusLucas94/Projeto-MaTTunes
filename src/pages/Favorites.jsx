import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.renderAgain = this.renderAgain.bind(this);
    this.handleCarregando = this.handleCarregando.bind(this);
    this.buscarFavoritos = this.buscarFavoritos.bind(this);
    this.state = {
      carregando: false,
      musicasFavoritas: [],
    };
  }

  componentDidMount() {
    this.buscarFavoritos();
  }

  handleCarregando() {
    const { carregando } = this.state;
    if (carregando === true) {
      this.setState({ carregando: false });
    }
    if (carregando === false) {
      this.setState({ carregando: true });
    }
  }

  async buscarFavoritos() {
    this.handleCarregando();
    const musicasFavoritas = await getFavoriteSongs();
    this.handleCarregando();
    if (musicasFavoritas === null) {
      this.setState({
        musicasFavoritas: [],
      });
    } else {
      this.setState({
        musicasFavoritas,
      });
    }
  }

  renderAgain() {
    this.buscarFavoritos();
  }

  render() {
    const { musicasFavoritas, carregando } = this.state;
    return (
      <div>
        <Header />
        {carregando ? <Carregando /> : ''}
        <div data-testid="page-favorites">
          { musicasFavoritas.map((musica) => (
            <MusicCard
              renderAgain={ this.renderAgain }
              musica={ musica }
              key={ musica.trackId }
              handleCarregando={ this.handleCarregando }
              atualizarLista={ this.buscarFavoritos }
            />)) }
        </div>
      </div>
    );
  }
}

export default Favorites;
