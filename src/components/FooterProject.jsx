import React, { Component } from 'react';

class FooterProject extends Component {
    static displayName = "Footer"
    constructor(props) {
        super(props);

        //STATE
        this.state = {}

        //BIND
    } 
    render() {
        return (
            <React.Fragment>
                <footer className="text-center text-lg-start bg-dark text-white fixed-bottom44"
                    style={{ "marginTop": "48rem" }}>
                    <div className="text-center p-4" style={{ "backgroundColor": "rgba(0, 0, 0, 0.025)" }}>
                        Beytullah Onur Topbaş
                    </div>

                </footer>
            </React.Fragment >
        );
    }


}
export default FooterProject