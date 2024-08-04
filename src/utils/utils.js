import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'

import NavigationBar from './component/NavigationBar'
import CreateAccountForm from './component/CreateAccountForm'
import LoginForm from './component/LoginForm'
import Profile from './component/Profile'
import Movie from './component/Movie'
import SearchForm from './component/SearchForm'
import Paginator from './component/Paginator'
import MovieCard from './component/MovieCard'
import Premio from './component/Premio'

const showHeader = (user, movieDetail, showProfile, premio) => {
    if (user === null)
      return (<h1 className='text-info text-center'>TODO CINE</h1>)
    else if (movieDetail)
      return (<h1 className='text-info text-center'>DETALLE</h1>)
    else if (showProfile)
      return (<h1 className='text-info text-center'>PERFIL</h1>)
    else if (premio)
      return (<h1 className='text-info text-center'>{premio.titulo.toUpperCase()}</h1>)
    else
      return (<h1 className='text-info text-center'>PELÍCULAS</h1>)
   
  }

  const showBody = (user, showCrearCuenta, login, createUser, handleCrearCuenta, updateUser, showProfile, 
                        movieDetail, loadMovieDetail, showSearchForm, movie, premio, addFavoritos, removeFavoritos, addVote,
                        search) => {
      const container = (pelis) => {
                  return (<Container className='p-3 mb-2' fluid="md">
                     {showGridMovies(pelis, loadMovieDetail)}
                 </Container>)
      }

      const premios = (premio) => {
        return (<Container className='p-3 mb-2' fluid="md">
                    {showGridPremios(premio.categorias, loadMovieDetail)}
                  </Container>)
      }
    
      if (user === null && !showCrearCuenta)
        return (<div><LoginForm login={login} handleCrearCuenta={handleCrearCuenta}/></div>)

      else if (user === null && showCrearCuenta)
        return (<div>
                <NavigationBar user={null} logout={null} loadCartelera={null} loadFavs={null} loadProfile={null}/>
                <CreateAccountForm createUser={createUser} />
              </div>)
      
      else if (showProfile)
        return (<div><Profile usuario={user} updateUser={updateUser} /></div>)
      
      else if (movieDetail)
        return (<div><Movie userFavs={user.favoritos.filter(fav => fav.movieId === movieDetail.id)} movie={movieDetail} addFavoritos={addFavoritos} 
                    removeFavoritos={removeFavoritos} addVote={addVote} userVote={movieDetail.votos.filter(v => v.usuarioId === user.id)}/></div>)
      
      else if (showSearchForm)
          return (<div>
                    <div><SearchForm search={search} /></div>
                    {(movie) ? container(movie) : <></>}
                  </div>
                  )
      
      else if (movie) 
        return (<div>{container(movie)}</div>)
      
      else if (premio) 
        return (<div>{premios(premio)}</div>)
  }

  const showFooter = (user, movie, showCartelera, showFavoritos, search, paramSearch, loadCartelera, loadFavs) => {     
    if (user && movie && !showCartelera && !showFavoritos)  
      return (<div><Paginator functionSearch={search} param={paramSearch} pageNumbers={movie.total_pages} /></div>)
    else if (user && movie && showCartelera)
      return (<div><Paginator functionSearch={loadCartelera} param={paramSearch} pageNumbers={movie.total_pages} /></div>)
    else if (user && movie && showFavoritos)
      return (<div><Paginator functionSearch={loadFavs} param={user.id} pageNumbers={movie.total_pages} /></div>)
   
  }

  const showGridMovies = (movie, loadMovieDetail) => {
    const row = []
    if (movie !== null) {
      const length = movie.results.length
      let i = 0
      while (i + 3 <= length) {
        row.push(<Row key={i}><CardGroup>
          <MovieCard key={movie.results[i].id} movie={movie.results[i]} loadMovieDetail={loadMovieDetail}/>
          <MovieCard key={movie.results[i + 1].id} movie={movie.results[i + 1]} loadMovieDetail={loadMovieDetail}/>
          <MovieCard key={movie.results[i + 2].id} movie={movie.results[i + 2]} loadMovieDetail={loadMovieDetail}/>
          </CardGroup>
        </Row>)
        
        i = i + 3
      }
        
      if ( length - i === 1) {
          row.push(<Row key={length - 1 }><CardGroup>
            <MovieCard key={movie.results[length - 1].id} movie={movie.results[length - 1]} loadMovieDetail={loadMovieDetail} />
            <Card></Card>
            <Card></Card>
            </CardGroup></Row>)
      } else if (length - i === 2)  {
        row.push(<Row key={length}><CardGroup>
            <MovieCard key={movie.results[length - 2].id} movie={movie.results[length - 2]} loadMovieDetail={loadMovieDetail}/>
            <MovieCard key={movie.results[length - 1].id} movie={movie.results[length - 1]} loadMovieDetail={loadMovieDetail}/>
            <Card></Card>
            </CardGroup></Row>)
      }
    }

    return row

  }

  const showGridPremios = (categorias, loadMovieDetail) => {
    const row = []
    if (categorias !== null) {
      const length = categorias.length
      let i = 0
      while (i + 3 <= length) {
        row.push(<Row key={i}><CardGroup>
          <Premio key={categorias[i].movie.id} categoria={categorias[i]} loadMovieDetail={loadMovieDetail}/>
          <Premio key={categorias[i + 1].movie.id} categoria={categorias[i + 1]} loadMovieDetail={loadMovieDetail}/>
          <Premio key={categorias[i + 2].movie.id} categoria={categorias[i + 2]} loadMovieDetail={loadMovieDetail}/>
          </CardGroup>
        </Row>)
        
        i = i + 3
      }
        
      if ( length - i === 1) {
          row.push(<Row key={length - 1 }><CardGroup>
            <Premio key={categorias[length - 1].movie.id} categoria={categorias[length - 1]} loadMovieDetail={loadMovieDetail} />
            <Card></Card>
            <Card></Card>
            </CardGroup></Row>)
      } else if (length - i === 2)  {
        row.push(<Row key={length}><CardGroup>
            <Premio key={categorias[length - 2].movie.id} categoria={categorias[length - 2]} loadMovieDetail={loadMovieDetail}/>
            <Premio key={categorias[length - 1].movie.id} categoria={categorias[length - 1]} loadMovieDetail={loadMovieDetail}/>
            <Card></Card>
            </CardGroup></Row>)
      }
    }

    return row

  }

  export default { showHeader, showBody, showFooter }