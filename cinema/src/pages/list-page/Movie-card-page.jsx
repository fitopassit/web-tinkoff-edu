import {MovieCard} from "./Movie-card.jsx";
import {Box, Container, Divider} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";

export function MovieCardPage() {
    return (<div>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>

        <Divider sx={{mb: 5, mr: 2}}></Divider>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h6"
                        component="span"
                        sx={{flexGrow: 1}}>Найдено n элементов</Typography>
            <Button sx={{ml: 5}} variant="contained" color="button"
            ><AddIcon/>Добавить
            </Button>
        </Box>
    </div>)
}