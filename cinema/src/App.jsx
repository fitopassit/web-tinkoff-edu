import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ListPage} from './pages';
import React from "react";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListPage/>}/>
                {/*<Route path="/movies/:imbdID" element={<MovieCard />} />*/}
                {/*<Route path="*" element={<Navigate to="/movies" replace />} /> add Navigate*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
