import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home'
import Shelves from '../pages/Shelves/Shelves'
import Parts from '../pages/Parts/Parts'
import NotFound from '../pages/NotFound/NotFound'
import ShelfDetails from '../pages/Shelves/ShelfDetails'
import AddShelf from '../pages/Shelves/AddShelf';
import AddPart from '../pages/Parts/AddPart';
import PartDetail from '../pages/Parts/PartDetail';

const AppRouter = () => {
    return (
        <Router>
            <Routes>

                {/* Home */}
                <Route path="/" element={<Home />} />


                {/* Shelves */}
                <Route path="/shelves" element={<Shelves />} />
                <Route path="/shelves/:id" element={<ShelfDetails />} />
                <Route path="/shelves/add" element={<AddShelf />} />


                {/* Parts */}
                <Route path="/parts" element={<Parts />} />
                <Route path="/parts/:id" element={<PartDetail />} />
                <Route path="/parts/add" element={<AddPart />} />


                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default AppRouter