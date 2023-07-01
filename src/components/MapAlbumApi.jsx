import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/MapAlbumApi.css';

class AlbumCard extends React.Component {
  render() {
    const { informacaoDoAlbum } = this.props;
    const {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = informacaoDoAlbum;

    return (
      <div className="container-MapAlbumApi">
        <Link
          key={ collectionId }
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="card"
        >
          <img
            className="img-MapAlbumApi"
            src={ artworkUrl100 }
            alt={ collectionName }
          />
          <h3 className="h3-MapAlbumApi">{collectionName}</h3>
          <h4 className="h4-MapAlbumApi">{artistName}</h4>
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  informacaoDoAlbum: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCount: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCard;
