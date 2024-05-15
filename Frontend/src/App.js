import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import Login from './components/Login';


function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<MainLayout><Homepage /></MainLayout>}
                />
                <Route
                    path="/login"
                    element={<MainLayout><Login /></MainLayout>}
                />
            </Routes>
        </Router>
    )
}