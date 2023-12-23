import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ActorsList } from './Actors-list.jsx';
import { Rating } from './Rating.jsx';

const copyIdInClipboard = id => {
  navigator.clipboard.writeText(id);
};

export const MovieCard = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [isLiked, setLiked] = useState(false);

  let { id: movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async id => {
      let url = `http://localhost:3000/movies/${id}`;
      try {
        const response = await fetch(url);
        const currentMovie = await response.json();
        setMovie(currentMovie);
      } catch (err) {
        alert('Ошибка в запросе на получение данных для отрисовки карточки: ' + err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies(movieId);
  }, [movieId]);

  const imgError = event => {
    event.target.src = 'https://via.placeholder.com/168x250';
  };

  if (loading) return <CircularProgress />;

  const { actors, director, genres, id, plot, posterUrl, runtime, title, year, rating } = movie;

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignItems: 'center' }}>
          <Typography component="span" variant="h6">
            id: {id}
          </Typography>
          <IconButton component="span" onClick={copyIdInClipboard(id)}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to={`/movie/${id}/edit`}>
            <EditIcon />
            <Typography component="span" variant="h6">
              Редактировать
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <Box
          component="img"
          sx={{
            height: 300,
            width: 200,
            maxHeight: { xs: 120, md: 300 },
            maxWidth: { xs: 80, md: 200 },
            objectFit: 'cover',
          }}
          alt="Movie poster"
          src={posterUrl}
          onError={imgError}
        />
        <Typography component="span" variant="h5" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <IconButton onClick={() => setLiked(prevState => !prevState)}>
          <FavoriteIcon aria-label="add to favorites" color={isLiked ? 'primary' : 'inherit'} />
        </IconButton>
      </Box>
      <Box>
        <Typography variant="body2" component="div" color="text.secondary">
          {director}
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          Год производства: {year}
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          Длительность: {runtime} минут
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          Жанры: {genres ? genres.join(', ') : ''}
        </Typography>
        <ActorsList actors={actors} />
        <Typography variant="h5" component="div">
          Описание:
        </Typography>
        <Typography variant="body2" component="div" color="text.secondary">
          {plot}
        </Typography>
        <Typography variant="h5" component="span" color="text.secondary">
          Текущий рейтинг:
          <Rating rating={rating} />
        </Typography>
      </Box>
    </Box>
  );
};
