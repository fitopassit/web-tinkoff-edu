import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from "@mui/material";

export const Header = () => {
    return (
        // <ThemeProvider theme={theme}>
            <AppBar position="absolute" sx={{backgroundColor: "customColor.base_02"}}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="span"
                        color="button.contrastText"
                        sx={{flexGrow: 1}}
                    >Админка фильмотеки
                    </Typography>
                    <Button variant="contained" color="button"
                    >6409 Пирогов Артём</Button>
                </Toolbar>
            </AppBar>
        // </ThemeProvider>
    );
}
