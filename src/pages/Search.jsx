import React from 'react';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import AlbumCard from '../components/MapAlbumApi';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.state = {
      nome: '',
      carregando: false,
      retornoDeAlbuns: '',
      pesquisaFeita: false,
      nomeDoArtista: '',
    };
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { nome } = this.state;
    this.setState({
      nomeDoArtista: nome,
      nome: '',
      carregando: true,
    });
    const buscarAlbum = await searchAlbumsAPI(nome);
    this.setState({
      pesquisaFeita: true,
      carregando: false,
      retornoDeAlbuns: buscarAlbum,
    });
  }

  searchBar() {
    const { nome } = this.state;
    return (
      <form className="container-formSearch" data-testid="page-search">
        <Header />
        <input
          name="nome"
          onChange={ this.handleChange }
          value={ nome }
          type="text"
          data-testid="search-artist-input"
          className="input-text"
        />
        <button
          className="btn-pesquisar"
          disabled={ nome.length < 2 }
          type="submit"
          data-testid="search-artist-button"
          onClick={ this.handleSubmit }
        >
          Pesquisar
        </button>
      </form>
    );
  }

  render() {
    const { nomeDoArtista, carregando, pesquisaFeita, retornoDeAlbuns } = this.state;
    if (pesquisaFeita) {
      return (
        retornoDeAlbuns.length > 0 ? (
          <>
            {this.searchBar()}
            <p className="paragrafo">{`Resultado de álbuns de: ${nomeDoArtista}`}</p>
            <div className="album-cards-container">
              {retornoDeAlbuns.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  informacaoDoAlbum={ album }
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {this.searchBar()}
            <p>Nenhum álbum foi encontrado</p>
          </>
        )
      );
    }
    return (
      <div>
        {carregando ? <Carregando />
          : this.searchBar()}
      </div>
    );
  }
}

export default Search;
