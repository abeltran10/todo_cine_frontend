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
    return <h1 className='text-info text-center'>{premioGanadores[0].premio.toUpperCase()}</h1>
  
  return <h1 className='text-info text-center'>PELÍCULAS</h1>
}

const showBody = ({ user, uiState, movieState, handlers }) => {
  const {
    showCrearCuenta,
    showProfile,
    showSearchForm
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
        userFavs={user.favoritos.filter(fav => fav.movieId === movieDetail.id)}
        movie={movieDetail}
        addFavoritos={addFavoritos}
        removeFavoritos={removeFavoritos}
        addVote={addVote}
        userVote={movieDetail.votos.filter(v => v.usuarioId === user.id)}
      />
    )

  if (showSearchForm)
    return (
      <div>
        <SearchForm search={search} />
        {movies ? container(movies) : null}
      </div>
    )

  if (movies) return container(movies)
  if (premioGanadores) return ganadores(premioGanadores)
  if (premioAnyos) return showPremioAnyos(premioAnyos)
}

const showFooter = ({ user, movieState, uiState, handlers }) => {
  const { movies, paramSearch } = movieState
  const { showCartelera, showFavoritos } = uiState
  const { search, loadCartelera, loadFavs } = handlers

  if (!user || !movies) return null

  if (!showCartelera && !showFavoritos)
    return <Paginator functionSearch={search} param={paramSearch} pageNumbers={movies.total_pages} />

  if (showCartelera)
    return <Paginator functionSearch={loadCartelera} param={paramSearch} pageNumbers={movies.total_pages} />

  if (showFavoritos)
    return <Paginator functionSearch={loadFavs} param={user.id} pageNumbers={movies.total_pages} />
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
  if (ganadores !== null) {
    const length = ganadores.length
    let i = 0
    while (i + 3 <= length) {
      row.push(<Row key={i}><CardGroup>
        <Premio key={i} ganador={ganadores[i]} loadMovieDetail={loadMovieDetail}/>
        <Premio key={i + 1} ganador={ganadores[i + 1]} loadMovieDetail={loadMovieDetail}/>
        <Premio key={i + 2} ganador={ganadores[i + 2]} loadMovieDetail={loadMovieDetail}/>
        </CardGroup>
      </Row>)
      
      i = i + 3
    }
      
    if ( length - i === 1) {
        row.push(<Row key={length - 1}><CardGroup>
          <Premio key={length - 1} ganador={ganadores[length - 1]} loadMovieDetail={loadMovieDetail} />
          <Card></Card>
          <Card></Card>
          </CardGroup></Row>)
    } else if (length - i === 2)  {
      row.push(<Row key={length - 2}><CardGroup>
          <Premio key={length - 2} ganador={ganadores[length - 2]} loadMovieDetail={loadMovieDetail}/>
          <Premio key={length - 1} ganador={ganadores[length - 1]} loadMovieDetail={loadMovieDetail}/>
          <Card></Card>
          </CardGroup></Row>)
    }
  }

  return row

}

const showGridPremioAnyos = (premioAnyos, loadPremio) => {
  console.log(premioAnyos[2]) 
  
  const card = (i) => {
    
    return <div>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{premioAnyos[2][i]}</Card.Title>
                      <Button className="detalleButton" variant="primary" onClick={() => loadPremio(premioAnyos[0], premioAnyos[2][i])}>Detalle</Button>
                    </Card.Body>
                  </Card>  
            </div>
              
    }
  
  
    const row = []
    const anyos = premioAnyos[2].length
    let i = 0
    while (i + 3 <= anyos) {
      row.push(
          <Row key={i}>      
          <CardGroup>
              {card(i)}
              {card(i + 1)}
              {card (i + 2)}
          </CardGroup>
        </Row>  
      )

    i = i + 3
    }

    if (anyos - i === 1) { 
      row.push(
          <Row key={anyos - 1}>      
          <CardGroup>
              {card(anyos - 1)}
          </CardGroup>
        </Row> 
      ) 
    } else if (anyos - i === 2) {
      row.push(
          <Row key={anyos - 2}>      
          <CardGroup>
              {card(anyos - 2)}
              {card(anyos - 1)}
          </CardGroup>
        </Row> 
      ) 
    }
    
    return row
 }

  export default { showHeader, showBody, showFooter }