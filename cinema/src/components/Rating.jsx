export const Rating = ({ rating }) => {
  return typeof rating === 'string' ? <span> {rating}</span> : <span> -</span>;
};
