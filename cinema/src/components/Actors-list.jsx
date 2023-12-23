import { Typography } from '@mui/material';

export const ActorsList = ({ actors }) => {
  let actorsArray = actors?.split(',');
  let renderActors = actorsArray ? actorsArray.slice(0, 5) : [];
  return renderActors.at(0) === '' ? (
    <Typography variant="body2" component="span" sx={{ fontSize: '16px', display: 'block' }}>
      Список актеров пуст
    </Typography>
  ) : (
    <>
      <Typography variant="body2" component="span" sx={{ fontSize: '16px', display: 'block' }}>
        В главных ролях: {renderActors.join(', ')}
      </Typography>
      <Typography variant="body2" component="span" sx={{ fontSize: '16px', color: '#336FEE', display: 'block' }}>
        {actorsArray.length > 5 ? <Typography>Остальные {actorsArray.length - 5}</Typography> : false}
      </Typography>
    </>
  );
};
