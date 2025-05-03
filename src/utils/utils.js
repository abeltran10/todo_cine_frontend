import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import NavigationBar from '../component/NavigationBar'
import CreateAccountForm from '../component/CreateAccountForm'
import LoginForm from '../component/LoginForm'
import Profile from '../component/Profile'
import Movie from '../component/Movie'
import SearchForm from '../component/SearchForm'
import Paginator from '../component/Paginator'
import MovieCard from '../component/MovieCard'
import Premio from '../component/Premio'
import PremioAnyos from '../component/PremioAnyos'
import FavoritosCard from '../component/FavoritosCard'


const showHeader = ({ user, movieState, uiState }) => {
  const { movieDetail, premioAnyos, premioGanadores } = movieState
  const { showProfile } = uiState

  if (!user) 
    return <h1 className='text-info text-center'>TODO CINE</h1>
  else if (movieDetail)
     return <h1 className='text-info text-center'>DETALLE</h1>
  else if (showProfile) 
    return <h1 className='text-info text-center'>PERFIL</h1>
  else if (premioAnyos) 
    return <h1 className='text-info text-center'>{premioAnyos[1].toUpperCase()}</h1>
  else if (premioGanadores) 
    return <h1 className='text-info text-center'>{premioGanadores.results[0].premio.toUpperCase()}</h1>
  
  return <h1 className='text-info text-center'>PELÍCULAS</h1>
}

const showBody = ({ user, uiState, movieState, handlers }) => {
  const {
    showCrearCuenta,
    showProfile,
    showSearchForm,
    showFavoritos
  } = uiState

  const {
    movies,
    movieDetail,
    premioAnyos,
    premioGanadores
  } = movieState

  const {
    login,
    createUser,
    handleCrearCuenta,
    updateUser,
    loadMovieDetail,
    loadPremio,
    addFavoritos,
    removeFavoritos,
    updateVista,
    addVote,
    search
  } = handlers

  const container = (pelis) => (
    <Container className='p-3 mb-2' fluid="md">
      {showGridMovies(pelis, loadMovieDetail)}
    </Container>
  )

  const ganadores = (ganadores) => (
    <Container className='p-3 mb-2' fluid="md">
      {showGridGanadores(ganadores, loadMovieDetail)}
    </Container>
  )

  const showPremioAnyos = (premioAnyos) => (
    <Container className='p-3 mb-2' fluid="md">
      {showGridPremioAnyos(premioAnyos, loadPremio)}
    </Container>
  )

  const favoritos = (pelis) => (
    <Container className='p-3 mb-2' fluid="md">
      {showGridFavoritos(pelis, loadMovieDetail, updateVista)}
    </Container>
  )

  if (!user && !showCrearCuenta)
    return <div><LoginForm login={login} handleCrearCuenta={handleCrearCuenta} /></div>

  if (!user && showCrearCuenta)
    return (
      <div>
        <NavigationBar />
        <CreateAccountForm createUser={createUser} />
      </div>
    )

  if (showProfile)
    return <Profile usuario={user} updateUser={updateUser} />

  if (movieDetail)
    return (
      <Movie
        movieDetail={movieDetail}
        addFavoritos={addFavoritos}
        removeFavoritos={removeFavoritos}
        addVote={addVote}
      />
    )

  if (showSearchForm)
    return (
      <div>
        <SearchForm search={search} />
        {movies ? container(movies) : null}
      </div>
    )

  if (movies && !showFavoritos) return container(movies)
  if (showFavoritos) return favoritos(movies)
  if (premioGanadores) return ganadores(premioGanadores)
  if (premioAnyos) return showPremioAnyos(premioAnyos)
}

const showFooter = ({ user, movieState, uiState, handlers }) => {
  const { movies, paramSearch, premioGanadores} = movieState
  const { showCartelera, showFavoritos } = uiState
  const { search, loadCartelera, loadFavs, loadPremio } = handlers

  if (!user || (!movies && !premioGanadores)) return null

  if (!showCartelera && !showFavoritos && movies)
    return <Paginator functionSearch={search} param={paramSearch} pageNumbers={movies.total_pages} />

  if (showCartelera)
    return <Paginator functionSearch={loadCartelera} param={paramSearch} pageNumbers={movies.total_pages} />

  if (showFavoritos)
    return <Paginator functionSearch={loadFavs} param={user.id} pageNumbers={movies.total_pages} />
  if (premioGanadores) {
    const parameters = {premioCod: premioGanadores.results[0].premioCod, premioAnyo: premioGanadores.results[0].anyo}
    return <Paginator functionSearch={loadPremio} param={parameters} pageNumbers={premioGanadores.total_pages} />
  }
}


const showGridMovies = (movies, loadMovieDetail) => {
  const row = []
  if (movies !== null) {
    const length = movies.results.length
    let i = 0
    while (i + 3 <= length) {
      row.push(<Row key={i}><CardGroup>
        <MovieCard key={i} movie={movies.results[i]} loadMovieDetail={loadMovieDetail}/>
        <MovieCard key={i + 1} movie={movies.results[i + 1]} loadMovieDetail={loadMovieDetail}/>
        <MovieCard key={i + 2} movie={movies.results[i + 2]} loadMovieDetail={loadMovieDetail}/>
        </CardGroup>
      </Row>)
      
      i = i + 3
    }
      
    if ( length - i === 1) {
        row.push(<Row key={length - 1}><CardGroup>
          <MovieCard key={length - 1} movie={movies.results[length - 1]} loadMovieDetail={loadMovieDetail} />
          <Card></Card>
          <Card></Card>
          </CardGroup></Row>)
    } else if (length - i === 2)  {
      row.push(<Row key={length - 2}><CardGroup>
          <MovieCard key={length - 2} movie={movies.results[length - 2]} loadMovieDetail={loadMovieDetail}/>
          <MovieCard key={length - 1} movie={movies.results[length - 1]} loadMovieDetail={loadMovieDetail}/>
          <Card></Card>
          </CardGroup></Row>)
    }
  }

  return row

}

const showGridGanadores = (ganadores, loadMovieDetail) => {
  const row = []
  if (ganadores.results !== null) {
    const length = ganadores.results.length
    let i = 0
    while (i + 3 <= length) {
      row.push(<Row key={i}><CardGroup>
        <Premio key={i} ganador={ganadores.results[i]} loadMovieDetail={loadMovieDetail}/>
        <Premio key={i + 1} ganador={ganadores.results[i + 1]} loadMovieDetail={loadMovieDetail}/>
        <Premio key={i + 2} ganador={ganadores.results[i + 2]} loadMovieDetail={loadMovieDetail}/>
        </CardGroup>
      </Row>)
      
      i = i + 3
    }
      
    if ( length - i === 1) {
        row.push(<Row key={length - 1}><CardGroup>
          <Premio key={length - 1} ganador={ganadores.results[length - 1]} loadMovieDetail={loadMovieDetail} />
          <Card></Card>
          <Card></Card>
          </CardGroup></Row>)
    } else if (length - i === 2)  {
      row.push(<Row key={length - 2}><CardGroup>
          <Premio key={length - 2} ganador={ganadores.results[length - 2]} loadMovieDetail={loadMovieDetail}/>
          <Premio key={length - 1} ganador={ganadores.results[length - 1]} loadMovieDetail={loadMovieDetail}/>
          <Card></Card>
          </CardGroup></Row>)
    }
  }

  return row

}

const showGridPremioAnyos = (premioAnyos, loadPremio) => {
  console.log(premioAnyos[2]) 
  
    const row = []
    const anyos = premioAnyos[2].length
    let i = 0
    while (i + 3 <= anyos) {
      row.push(
          <Row key={i}>      
          <CardGroup>
              <PremioAnyos id={i} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][i]} loadPremio={loadPremio}/>
              <PremioAnyos id={i + 1} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][i + 1]} loadPremio={loadPremio}/>
              <PremioAnyos id={i + 2} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][i + 2]} loadPremio={loadPremio}/>
          </CardGroup>
        </Row>  
      )

    i = i + 3
    }

    if (anyos - i === 1) { 
      row.push(
          <Row key={anyos - 1}>      
          <CardGroup>
             <PremioAnyos id={anyos - 1} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][anyos - 1]} loadPremio={loadPremio}/>
          </CardGroup>
        </Row> 
      ) 
    } else if (anyos - i === 2) {
      row.push(
          <Row key={anyos - 2}>      
            <CardGroup>
              <PremioAnyos id={anyos - 2} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][anyos - 2]} loadPremio={loadPremio}/>
              <PremioAnyos id={anyos - 1} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][anyos - 1]} loadPremio={loadPremio}/>
            </CardGroup>
        </Row> 
      ) 
    }
    
    return row
 }

 const showGridFavoritos = (movies, loadMovieDetail, updateVista) => {
  const row = []
  if (movies !== null) {
    const length = movies.results.length
    let i = 0
    while (i + 3 <= length) {
      row.push(<Row key={i}><CardGroup>
        <FavoritosCard key={i} movie={movies.results[i]} pagina={movies.page} loadMovieDetail={loadMovieDetail} updateVista={updateVista}/>
        <FavoritosCard key={i + 1} movie={movies.results[i + 1]} pagina={movies.page} loadMovieDetail={loadMovieDetail} updateVista={updateVista}/>
        <FavoritosCard key={i + 2} movie={movies.results[i + 2]} pagina={movies.page} loadMovieDetail={loadMovieDetail} updateVista={updateVista}/>
        </CardGroup>
      </Row>)
      
      i = i + 3
    }
      
    if ( length - i === 1) {
        row.push(<Row key={length - 1}><CardGroup>
          <FavoritosCard key={length - 1} movie={movies.results[length - 1]} pagina={movies.page} loadMovieDetail={loadMovieDetail} updateVista={updateVista} />
          <Card></Card>
          <Card></Card>
          </CardGroup></Row>)
    } else if (length - i === 2)  {
      row.push(<Row key={length - 2}><CardGroup>
          <FavoritosCard key={length - 2} movie={movies.results[length - 2]} pagina={movies.page} loadMovieDetail={loadMovieDetail} updateVista={updateVista}/>
          <FavoritosCard key={length - 1} movie={movies.results[length - 1]} pagina={movies.page} loadMovieDetail={loadMovieDetail} updateVista={updateVista}/>
          <Card></Card>
          </CardGroup></Row>)
    }
  }

  return row

}


  export default { showHeader, showBody, showFooter }