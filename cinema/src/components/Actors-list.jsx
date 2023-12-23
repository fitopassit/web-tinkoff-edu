import { Typography } from '@mui/material';

export const ActorsList = ({ actors }) => {
  let actorsArray = actors?.split(',');
  let renderActors = actorsArray ? actorsArray.slice(0, 5) : [];
  return renderActors.at(0) === '' ? (
    <Typography variant="body2" component="div" color="text.secondary">
      Список актеров пуст
    </Typography>
  ) : (
    <Typography variant="body2" component="div" color="text.secondary">
      В главных ролях: {renderActors.join(', ')}
      <br />
      {actorsArray.length > 5 ? <Typography>Остальные {actorsArray.length - 5}</Typography> : false}
    </Typography>
  );
};
