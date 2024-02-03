import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Movie from '../component/Movie'

test('renders content', () => {
  const movie = {
    id: '13',
    original_title: 'Almost famous',
    release_date: '2000-01-01',
    genres: [],
    total_votos_TC: 0,
    votos_media_TC: 0,
    vote_count: 2,
    vote_average: 4,
    poster_path: null,
    videos: []
  }

  const userFavs = []

  const userVote = []

  const mockHandler = jest.fn()

  const component = render(<Movie userFavs={userFavs} userVote={userVote} addFavoritos={null} removeFavoritos={null} addVote={mockHandler} movie={movie} />)

  const ratingStar3 = component.container.querySelector('.voto-3')
  const ratingStar5 = component.container.querySelector('.voto-5')

  fireEvent.click(ratingStar3)
  fireEvent.click(ratingStar5)

  expect(mockHandler.mock.calls).toHaveLength(2)

})