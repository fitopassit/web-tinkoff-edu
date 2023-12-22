import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        customColor: {
            base_01: '#fff',
            base_02: '#f6f7f8',
            base_03: '#9299a2',
            base_04: '#333333',
            base_05: '#666666',
            base_06: 'rgba(0, 0, 0, 0.2)',
        },
        button: {
            main: '#ffdd2d',
            light: '#fcc521',
            dark: '#fab619',
            contrastText: '#000000',
        },
    },
});
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
,
)
