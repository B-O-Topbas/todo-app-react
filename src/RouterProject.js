import React from 'react'
//Router
import { Navigate, Route, Routes } from 'react-router-dom'
import HeaderProject from './components/HeaderProject'
import MainProject from './components/MainProject'
import FooterProject from './components/FooterProject'
import Login from './components/security/Login'
import Todo from './components/Todo/Todo'

function RouterProject() {
    return (
        <React.Fragment>
            <HeaderProject></HeaderProject>
            <div className="container mt-5 App-header">

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/index" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/todo" element={<Todo />} />
                </Routes>
            </div>
            <FooterProject />
        </React.Fragment>

    )
}

export default RouterProject