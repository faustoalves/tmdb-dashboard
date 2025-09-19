import axios from 'axios'

// Base URL muda dependendo do ambiente
const baseURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:3000/api'  // Desenvolvimento
  : '/api'  // Produção (Vercel)

export const api = axios.create({
  baseURL,
  timeout: 10000,
})

export const tmdbAPI = {
  // Filmes populares
  getPopularMovies: (page = 1) => 
    api.get(`/movies/popular?page=${page}`),
  
  // Filmes mais bem avaliados
  getTopRatedMovies: (page = 1) => 
    api.get(`/movies/top-rated?page=${page}`),
  
  // Detalhes do filme
  getMovieDetails: (id: number) => 
    api.get(`/movies/${id}`),
  
  // Buscar filmes
  searchMovies: (query: string, page = 1) => 
    api.get(`/search/movies?q=${encodeURIComponent(query)}&page=${page}`),
  
  // Gêneros
  getGenres: () => 
    api.get('/genres'),
  
  // URL para imagens
  getImageUrl: (path: string, size: 'w300' | 'w500' | 'w780' | 'original' = 'w500') => 
    `https://image.tmdb.org/t/p/${size}${path}`,
}
