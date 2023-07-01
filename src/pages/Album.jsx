import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';

class Album extends React.Component {
  constructor() {
    super();
    this.handleCarregando = this.handleCarregando.bind(this);
    this.pegarAlbumInfo = this.pegarAlbumInfo.bind(this);
    this.state = {
      objetoDeMusicas: [],
      artistName: '',
      collectionName: '',
      carregando: false,
    };
  }

  componentDidMount() {
    this.pegarAlbumInfo();
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

  async pegarAlbumInfo() {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    const musicasDoAlbum = await getMusics(id);
    const objetoAlbumInfo = musicasDoAlbum[0];
    const { artistName, collectionName } = objetoAlbumInfo;
    this.setState({
      objetoDeMusicas: musicasDoAlbum,
      artistName,
      collectionName,
    });
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const {
      objetoDeMusicas,
      artistName,
      collectionName,
      carregando } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          <h4 data-testid="artist-name">
            { artistName }
          </h4>
          <h4 data-testid="album-name">
            { collectionName }
          </h4>
          {carregando ? <Carregando /> : '' }
          { objetoDeMusicas.slice(1).map((musica) => (
            <MusicCard
              musica={ musica }
              key={ musica.trackId }
              albumId={ id }
              handleCarregando={ this.handleCarregando }
            />)) }
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
