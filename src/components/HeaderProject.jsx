/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
class HeaderProject extends Component {
    constructor(props){
        super(props);
    }
 
    // Display Name
    static displayName = "Header_Project";

    render() {

        // RETURN
        return (
            <header className="header">
                <nav className="navbar  bg-dark fixed top">
                    <div className="container">
                        <ul className="navbar-nav me-auto mt-18 mt-lg-0"></ul>
                        <a className="mavbar-brand" href="/" style={{color: "#ffffff"}}>
                            <h1 style={{textAlign:"center",display:"inline-block"}}>TODO APP</h1>
                        </a>
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0"></ul>
                    </div>

                </nav>
            </header>
         

        ); //end return
    } //end render
}

export default HeaderProject;