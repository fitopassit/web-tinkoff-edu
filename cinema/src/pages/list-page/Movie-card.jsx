import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function MovieCard() {
    return (
        <Card sx={
            {minWidth: 110,
            mb: 2,
            mt: 2,
            borderRadius: 3,
            }}>
            <CardActionArea >
                <CardContent >
                    <Typography sx={{mb: 1.5}} >
                        Название фильма
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        1990 | теги жанры<br/>
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    )
}