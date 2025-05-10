import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import PrivateRoute from './component/common/PrivateRoute'
import LoginFormContainer from './containers/LoginFormContainer'
import HomeContainer from './containers/HomeContainer'
import ProfileContainer from './containers/ProfileContainer'
import PremioAnyosContainer from './containers/PremioAnyosContainer'
import PremioContainer from './containers/PremioContainer'
import MovieDetailContainer from './containers/MovieDetailContainer'
import FavoritosContainer from './containers/FavoritosContainer'
import CreateAccountContainer from './containers/CreateAccountContainer'
import CarteleraContainer from './containers/CarteleraContainer'
import PublicRoute from './component/common/PublicRoute'


const App = () => {
  
  return (
    <Routes>
       <Route path="/app/" element={
          <PublicRoute>
            <LoginFormContainer />
          </PublicRoute>
        }/>
      
      <Route path="/app/home" element={
          <PrivateRoute>
            <HomeContainer />
          </PrivateRoute>
        }/>
      
      <Route
        path="/app/profile" element={
          <PrivateRoute>
            <ProfileContainer />
          </PrivateRoute>
        }/>
      
      <Route path="/app/premio/:premioId" element={
          <PrivateRoute>
            <PremioAnyosContainer />
          </PrivateRoute>
        }/>
      
      <Route path="/app/premio/:premioCod/anyo/:premioAnyo" element={
          <PrivateRoute>
            <PremioContainer />
          </PrivateRoute>
        }/>
      
      <Route path="/app/moviedetail/:movieId" element={
          <PrivateRoute>
            <MovieDetailContainer />
          </PrivateRoute>
        }/>
      
      <Route path="/app/favoritos" element={
          <PrivateRoute>
            <FavoritosContainer />
          </PrivateRoute>
        }/>
      
      <Route path="/app/createaccount" element={
          <PrivateRoute>
            <CreateAccountContainer />
          </PrivateRoute>
        }/>
      
      <Route path="/app/region/:region" element={
          <PrivateRoute>
            <CarteleraContainer />
          </PrivateRoute>
        }/>
      
    </Routes>
  )
}

export default App
