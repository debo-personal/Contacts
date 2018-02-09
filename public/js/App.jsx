import React from "react";
require('../css/app.css')
import {Grid, Row, Col, Button} from 'react-bootstrap';
import ContactList from './ContactList';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts : []
        }
    }

    componentDidMount() {
        fetch('./contacts')
            .then( result => result.json())
            .then( contacts => this.setState({contacts}));
    }

    render() {
        return (
        <div>
            <h1>Contacts</h1>
            <ContactList contacts = {this.state.contacts}/>
        </div>
        );
    }
}

export default App;