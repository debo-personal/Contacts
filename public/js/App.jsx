import React from "react";
require('../css/app.css')
import {Grid} from 'react-bootstrap';
import ContactList from './ContactList';
import NewContact from './NewContact';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts : []
        };
        this.onNewContactAddition = this.onNewContactAddition.bind(this);
    }

    componentDidMount() {
        this.fetchContacts()
            .then( contacts => this.setState({contacts}));
    }

    fetchContacts() {
        const contactsListPromise = fetch('./contacts')
                        .then( result => result.json());
        return contactsListPromise;
    }

    onNewContactAddition() {
        this.fetchContacts()
            .then( contacts => this.setState({contacts}));
    }

    render() {
        return (
            <Grid fluid={true}>
                <h1>Contacts</h1>
                <ContactList contacts = {this.state.contacts}/>
                <NewContact onNewContactAddition={this.onNewContactAddition}/>
            </Grid>
        );
    }
}

export default App;