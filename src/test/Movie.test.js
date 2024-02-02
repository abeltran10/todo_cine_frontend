import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

test('like click event', () => {
    const movie = 
      {
        id: "756",
        original_title: "Fantasia",
        title: "Fantasía",
        poster_path: "/m9F1Ucv2raJWFYE3uqbodEx55gh.jpg",
        overview: "Una colección de interpretaciones animadas de grandes obras de música clásica. En 'El Aprendiz de Brujo' (P. Dukas), Mickey Mouse, discípulo de un mago, se mete en un gran embrollo, pues sus conocimientos de magia son muy limitados. 'La Consagración de la Primavera' (Stravinsky) cuenta la historia de la evolución, desde los seres unicelulares hasta la extinción de los dinosaurios. 'La Danza de las Horas' (Ponchielli) es un fragmento de un ballet cómico interpretado por elefantes, hipopótamos, cocodrilos y avestruces. 'Una Noche en el Monte Pelado' de Mussorgsky y el 'Ave Maria' de Schubert describen el enfrentamiento entre la oscuridad y la luz.",
        release_date: "1940-11-13",
        popularity: 29.302,
        vote_count: 2882,
        vote_average: 7.357,
        genres: [],
        original_language: "en",
        "videos": [
          {
            "id": "6398d83599259c0089b5ba64",
            "name": "Fantasía (Tráiler en Vídeo)",
            "key": "FXYFdPAmQMM",
            "site": "YouTube",
            "type": "Trailer"
          }
        ],
        "votos": [
          {
            "id": "65bd54b99eb9122b5ef357b0",
            "usuario": {
              "id": "65a698419def9357edcbbfe8",
              "username": null,
              "password": null,
              "accountNonExpired": null,
              "accountNonLocked": null,
              "credentialsNonExpired": null,
              "enabled": null,
              "favoritos": null,
              "votos": null
            },
            "movie": {
              "id": "756",
              "original_title": null,
              "title": null,
              "poster_path": null,
              "overview": null,
              "release_date": null,
              "popularity": null,
              "vote_count": null,
              "vote_average": null,
              "genres": null,
              "original_language": null,
              "videos": null,
              "votos": null,
              "total_votos_TC": null,
              "votos_media_TC": null
            },
            "voto": 0
          }
        ],
        "total_votos_TC": 1,
        "votos_media_TC": 0
      }
})