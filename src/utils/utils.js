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

const showHeader = (user, movieDetail, showProfile, premio, premioGanadores) => {
    if (user === null)
      return (<h1 className='text-info text-center'>TODO CINE</h1>)
    else if (movieDetail)
      return (<h1 className='text-info text-center'>DETALLE</h1>)
    else if (showProfile)
      return (<h1 className='text-info text-center'>PERFIL</h1>)
    else if (premio)
      return (<h1 className='text-info text-center'>{premio[1].toUpperCase()}</h1>)
    else if (premioGanadores)
      return (<h1 className='text-info text-center'>{premioGanadores[0].premio.toUpperCase()}</h1>)
    else
      return (<h1 className='text-info text-center'>PELÍCULAS</h1>)
   
  }

  const showBody = (user, showCrearCuenta, login, createUser, handleCrearCuenta, updateUser, showProfile, 
                        movieDetail, loadMovieDetail, showSearchForm, movie, premio, premioGanadores, loadPremio, addFavoritos, removeFavoritos, addVote,
                        search) => {
      const container = (pelis) => {
                  return (<Container className='p-3 mb-2' fluid="md">
                     {showGridMovies(pelis, loadMovieDetail)}
                 </Container>)
      }

      const ganadores = (ganadores) => {
        return (<Container className='p-3 mb-2' fluid="md">
                    {showGridGanadores(ganadores, loadMovieDetail)}
                  </Container>)
      }

      const showPremio = (premio) => {
        return (<Container className='p-3 mb-2' fluid="md">
                    {showGridPremio(premio, loadPremio)}
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
      
      else if (premioGanadores) 
        return (<div>{ganadores(premioGanadores)}</div>)
      
      else if (premio)
        return (<div>{showPremio(premio)}</div>)
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
          row.push(<Row key={length - 1}><CardGroup>
            <MovieCard key={movie.results[length - 1].id} movie={movie.results[length - 1]} loadMovieDetail={loadMovieDetail} />
            <Card></Card>
            <Card></Card>
            </CardGroup></Row>)
      } else if (length - i === 2)  {
        row.push(<Row key={length - 2}><CardGroup>
            <MovieCard key={movie.results[length - 2].id} movie={movie.results[length - 2]} loadMovieDetail={loadMovieDetail}/>
            <MovieCard key={movie.results[length - 1].id} movie={movie.results[length - 1]} loadMovieDetail={loadMovieDetail}/>
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
          <Premio key={ganadores[i].movie.id} ganador={ganadores[i]} loadMovieDetail={loadMovieDetail}/>
          <Premio key={ganadores[i + 1].movie.id} ganador={ganadores[i + 1]} loadMovieDetail={loadMovieDetail}/>
          <Premio key={ganadores[i + 2].movie.id} ganador={ganadores[i + 2]} loadMovieDetail={loadMovieDetail}/>
          </CardGroup>
        </Row>)
        
        i = i + 3
      }
        
      if ( length - i === 1) {
          row.push(<Row key={length - 1}><CardGroup>
            <Premio key={ganadores[length - 1].movie.id} ganador={ganadores[length - 1]} loadMovieDetail={loadMovieDetail} />
            <Card></Card>
            <Card></Card>
            </CardGroup></Row>)
      } else if (length - i === 2)  {
        row.push(<Row key={length - 2}><CardGroup>
            <Premio key={ganadores[length - 2].movie.id} ganador={ganadores[length - 2]} loadMovieDetail={loadMovieDetail}/>
            <Premio key={ganadores[length - 1].movie.id} ganador={ganadores[length - 1]} loadMovieDetail={loadMovieDetail}/>
            <Card></Card>
            </CardGroup></Row>)
      }
    }

    return row

  }

  const showGridPremio = (premio, loadPremio) => {
    console.log(premio[2]) 
    
    const card = (i) => {
      console.log("entra")
      return ( <div>
                   <Card style={{ width: '18rem' }}>
                     <Card.Body>
                       <Card.Title>{premio[2][i]}</Card.Title>
                       <Button className="detalleButton" variant="primary" onClick={() => loadPremio(premio[0], premio[2][i])}>Detalle</Button>
                     </Card.Body>
                    </Card>  
              </div>
               
             )
     }
    
    
     const row = []
     const anyos = premio[2].length
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