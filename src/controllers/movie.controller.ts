import axios from 'axios';
import { FastifyReply, FastifyRequest } from 'fastify';
import { addMovie, updateMovie, deleteMovie } from '../services/movie/movie.service';
import { orderByRank } from '../services/movie/util';

const movieProviderApi = process.env.MOVIE_PROVIDER_API as string;
const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-agent-key': process.env.MOVIE_PROVIDER_API_KEY as string,
    }
}

const categories = [
    { id: 1, name: '드라마' },
    { id: 2, name: '한국영화' },
    { id: 3, name: '해외영화' },
    { id: 4, name: '애니메이션' },
    { id: 5, name: '예능/오락' },
    { id: 6, name: '음악프로' },
    { id: 7, name: '시사/교양' },
];

export const toGetAllMovies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { genre, page, limit } = request.query as { genre: string, page: string, limit: string };
        const params = new URLSearchParams();

        if (genre) params.append('categoryId', genre);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);

        const url = `${movieProviderApi}/movies?${params.toString()}`;

        const response = await axios.get(url, config);
        // console.log(response);
        const movies = response.data;
        reply.send(movies);
    } catch (error) {
        console.log(error);
        reply.status(500).send({ error: 'Internal Server Error', message: error });
    }
};

export const toSearchMovies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { search } = request.query as { search: string };
        const url = `${movieProviderApi}/search?search=${search}`
        const response = await axios.get(url, config);
        const movies = response.data;
        reply.send({data: movies});
    } catch (error) {
        console.log(error)
        reply.status(500).send({ error: 'Internal Server Error', message: error });
    }
}

export const toGetMovieDetails = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { movieId } = request.params as { movieId: string };
        const { ep_no } = request.query as { ep_no: string };

        // console.log(`${movieProviderApi}/movies/${movieId}?ep_no=${ep_no}`);

        const playUrl = await axios.get(`${movieProviderApi}/movies/${movieId}?ep_no=${ep_no}`, config);

        // console.log(playUrl)

        reply.send({ status: 'success', data: playUrl.data });
    } catch (error: any) {
        console.error('Error occurred while fetching movie details:', error.response ? error.response.data : error.message);
        reply.status(500).send({ error: 'Internal Server Error', message: error.response ? error.response.data : 'An error occurred' });
    }
};

export const toGetCategoryMovies = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { limit, categoryGroup } = request.query as { limit: string | null, categoryGroup: string | null };
        const params = new URLSearchParams();

        if (limit) params.append('limit', limit);
        if (categoryGroup) params.append('categoryGroup', categoryGroup);

        const url = `${movieProviderApi}/movies/categories?${params.toString()}`;
        // console.log(url);
        const data = await axios.get(url, config);

        reply.send({ status: 'success', data: data.data.data });
    } catch (error: any) {
        console.error('Error occurred while fetching category movies:', error.response ? error.response.data : error.message);
        reply.status(500).send({
            error: 'Internal Server Error',
            message: error.response ? error.response.data : 'An error occurred',
        });
    }
};

export const toGetMoviesByCategories = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { limit } = request.query as { limit?: string };
  
      const requests = categories.map(async (category) => {
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit);
        params.append('categoryGroup', category.id.toString());
  
        try {
          const res = await axios.get(`${movieProviderApi}/movies/categories?${params.toString()}`, config);
          return { category: category.name, movies: res.data.data };
        } catch (err) {
          console.error(`Error fetching category ${category.name}:`, err);
          return { category: category.name, movies: [] };
        }
      });
  
      const results = await Promise.all(requests);
  
      const moviesByCategory = results.reduce((acc, result) => {
        acc[result.category] = result.movies;
        return acc;
      }, {} as { [key: string]: any[] });
  
      reply.send({ status: 'success', data: moviesByCategory });
    } catch (error: any) {
      console.error('Error occurred while fetching category movies:', error.response ? error.response.data : error.message);
      reply.status(500).send({
        error: 'Internal Server Error',
        message: error.response ? error.response.data : 'An error occurred',
      });
    }
};
  

export const toGetEpisodes = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.query as { id: string|null }
        const url = `${movieProviderApi}/movie/episodes?${id ? `title_id=${id}`:''}`        
        const data = await axios.get(url, config);
        reply.send({status: 'success', data: data.data});
    } catch (error: any) {
        console.error('Error occurred while playing movie:', error.response ? error.response.data : error.message);
        reply.status(500).send({ error: 'Internal Server Error', message: error.response ? error.response.data : 'An error occurred' });
    }
}

export const toAddMovie = async (request: FastifyRequest, reply: FastifyReply) => { 
    const movie = request.body as any;
    const insertedId = await addMovie(movie);
    reply.send(insertedId);
}

export const toUpdateMovie = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const id = request.params.id;
    const movie = request.body as any;
    const updated = await updateMovie(id, movie);
    reply.send({ success: updated });
}

export const toDeleteMovie = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const id = request.params.id;
    const deleted = await deleteMovie(id);
    reply.send({ success: deleted });
}
