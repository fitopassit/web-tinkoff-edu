import React from 'react';
import {Header} from '../components';
import {CssBaseline, Divider, Grid} from "@mui/material";
import {SearchTextField} from "./Search-text-field.jsx";
import {MovieCardPage} from "./Movie-card-page.jsx";
import {EditForm} from "./Edit-form.jsx";

export function ListPage() {
    return (
        <React.Fragment>
            <Header/>
            <CssBaseline/>
            <Grid container spacing={2} columns={16}>
                <Grid item={true} xs={8}>
                    <SearchTextField/>
                    {/*под хедером*/}
                    <MovieCardPage/>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item={true} xs={6}>
                    <EditForm/>
                </Grid>
            </Grid>
            {/*<Container maxWidth="sm">*/}

            {/*</Container>*/}


        </React.Fragment>
    )
}