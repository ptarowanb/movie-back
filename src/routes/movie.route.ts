import { FastifyInstance } from 'fastify'; 
import { toAddMovie, toDeleteMovie, toGetAllMovies, toGetCategoryMovies, toGetEpisodes, toGetMovieDetails, toSearchMovies, toUpdateMovie, toGetMoviesByCategories } from '../controllers/movie.controller';

const movieRoutes = async (fastify: FastifyInstance) => {

  fastify.get('/movies', toGetAllMovies);
  fastify.get('/movies/search', toSearchMovies);
  fastify.get('/movies/episodes', toGetEpisodes);
  fastify.get('/movie/categories', toGetCategoryMovies);
  fastify.get('/movie/categories/all', toGetMoviesByCategories);
  fastify.get('/movie/:movieId', toGetMovieDetails);
  fastify.post('/movies', toAddMovie);
  fastify.patch('/movies/:id', toUpdateMovie);
  fastify.delete('/movies/:id', toDeleteMovie);

}
export default movieRoutes;
