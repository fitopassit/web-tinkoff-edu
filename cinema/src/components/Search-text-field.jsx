import { CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchTextField({ searchQuery, onChangeQuery }) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      let url = `http://localhost:3000/movies/`;
      try {
        let movies = await fetch(url).then(response => response.json());
        setMovies(movies);
      } catch (err) {
        alert('Ошибка в запросе для поиска фильма: ' + err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
    setLoading(true);
  }, []);

  if (loading) return <CircularProgress />;

  let moviesLabels = movies.map(movie => [movie.title, movie.id]).map(item => ({ label: item[0], id: item[1] }));
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        component="span"
        options={moviesLabels}
        sx={{ width: 300, flexGrow: 1, ml: 2, overflow: 'hidden' }}
        onInputChange={(event, value, reason) => {
          if (reason !== 'reset') {
            onChangeQuery(value);
          }
        }}
        isOptionEqualToValue={option => (option.label ? option.label : '')}
        value={searchQuery || null}
        onChange={(event, value) => {
          onChangeQuery(value?.label);
          if (value?.id === undefined) {
            navigate(`./movie/`);
          } else {
            navigate(`./movie/${value.id}`);
          }
        }}
        renderInput={params => <TextField {...params} label="Введите название фильма" />}
      />
    </>
  );
}
