import React, {useState} from "react";
import {TextField, Box, FormControl, Button, Divider} from "@mui/material";
import {Link} from "react-router-dom"

export function EditForm() {
    const [filmName, setFilmName] = useState("");
    const [year, setYear] = useState(0);
    const [description, setDescription] = useState("");
    const [posterLink, setPosterLink] = useState("");
    const [rating, setRating] = useState(0);
    const [actorList, setActorList] = useState([]);
    const [director, setDirector] = useState("");

    const [filmNameError, setFilmNameError] = useState(false);
    const [yearError, setYearError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [posterLinkError, setPosterLinkError] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const [actorListError, setActorListError] = useState(false);
    const [directorError, setDirectorError] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault()

        setFilmNameError(false);
        setYearError(false);
        setDescriptionError(false);
        setPosterLinkError(false);
        setRatingError(false);
        setActorListError(false);
        setDirectorError(false);

        if (filmName == '') {
            setFilmNameError(true)
        }
        if (year == '') {
            setYearError(true);
        }
        if (description == '') {
            setDescriptionError(true);
        }
        if (posterLink == '') {
            setPosterLinkError(true);
        }
        if (rating == '') {
            setRatingError(true);
        }
        if (actorList == '') {
            setActorListError(true);
        }
        if (director == '') {
            setDirectorError(true);
        }

        if (filmName && year && description && posterLink && rating && actorList && director) {
            console.log(filmName, year, description, posterLink, rating, actorList, director);
        }
    }

    return (
        <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Редактирование / Создание</h2>
                <TextField
                    label="Название фильма"
                    onChange={e => setFilmName(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={filmName}
                    error={filmNameError}
                />
                <TextField
                    label="Год выпуска"
                    onChange={e => setYear(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={year}
                    error={yearError}
                />
                <TextField
                    label="Описание"
                    onChange={e => setDescription(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={description}
                    error={descriptionError}
                />
                <TextField
                    label="Укажите ссылку на обложку"
                    onChange={e => setPosterLink(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={posterLink}
                    error={posterLinkError}
                />
                <TextField
                    label="Рейтинг"
                    onChange={e => setRating(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={rating}
                    error={ratingError}
                />
                <TextField
                    label="Укажите список актеров"
                    onChange={e => setActorList(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={actorList}
                    error={actorListError}
                />
                <TextField
                    label="Режиссер"
                    onChange={e => setDirector(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={director}
                    error={directorError}
                />
                <Divider sx={{mb: 5}}></Divider>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="outlined"  type="submit">Отменить</Button>
                    <Button color="button" variant="contained" type="submit">Сохранить</Button>
                </Box>
            </form>
        </React.Fragment>
    );
}
