import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/MusicCard.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.addLocal = this.addLocal.bind(this);
    this.removeLocal = this.removeLocal.bind(this);
    this.buscarFavoritos = this.buscarFavoritos.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.state = {
      musicasFavoritas: [],
      carregando: false,
    };
  }

  componentDidMount() {
    this.buscarFavoritos();
  }

  async handleFavoriteClick(event) {
    const { checked } = event.target;
    const { musica, handleCarregando, renderAgain } = this.props;

    handleCarregando();
    if (checked === true) {
      await addSong(musica);
      this.addLocal(musica);
    }
    if (checked === false) {
      await removeSong(musica);
      this.removeLocal(musica);
    }
    if (renderAgain) {
      renderAgain();
    }
    handleCarregando();
    await this.buscarFavoritos();
  }

  addLocal(musica) {
    const { musicasFavoritas } = this.state;
    musicasFavoritas.push(musica);
    this.setState({ musicasFavoritas });
  }

  removeLocal(musica) {
    const { musicasFavoritas } = this.state;
    const novoEstado = musicasFavoritas.filter((element) => element === musica);
    console.log(novoEstado);
    this.setState({ musicasFavoritas: novoEstado });
  }

  async buscarFavoritos() {
    const musicasFavoritas = await getFavoriteSongs();
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

  render() {
    const { musicasFavoritas, carregando } = this.state;
    const { musica } = this.props;
    const { trackName, previewUrl, trackId } = musica;
    return (
      <div className="music-card" key={ trackId }>
        {carregando ? <Carregando /> : ''}
        <h3>
          { trackName }
        </h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="Favorita">
          <p>Favorita</p>
          <input
            id="Favorita"
            name={ trackId }
            onClick={ this.handleFavoriteClick }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            checked={ musicasFavoritas.some((element) => element.trackId === trackId) }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  renderAgain: PropTypes.func.isRequired,
  handleCarregando: PropTypes.func.isRequired,
  musica: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
