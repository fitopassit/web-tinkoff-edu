import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add.js";

export function SearchTextField() {
    // return (
    //     <TextField label="Введите название фильма" type="search" variant="standard" />
    // )
    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                component="span"
                options={top100Films}
                sx={{width: 300, mt: 10, flexGrow: 1}}
                renderInput={(params) => <TextField {...params} label="Введите название фильма"/>}
            />
        </div>

    );
}

const top100Films = [
    {label: 'The Shawshank Redemption', year: 1994},
    {label: 'The Godfather', year: 1972},
    {label: 'The Godfather: Part II', year: 1974},
    {label: 'The Dark Knight', year: 2008},
    {label: '12 Angry Men', year: 1957},
    {label: "Schindler's List", year: 1993},
    {label: 'Pulp Fiction', year: 1994}]