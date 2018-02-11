import React from "react";
import {Grid} from 'react-bootstrap';
import ContactList from './Contact/ContactList';
import NewContact from './Contact/NewContact';
import StatusPanel from './Common/StatusPanel';

require('../css/app.css');


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts : [],
            showStatusPanel : false,
            statusMode : '',
            statusMessage : ''
        };
        this.refreshContactsState = this.refreshContactsState.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.onStatusPanelClose = this.onStatusPanelClose.bind(this);
    }

    componentDidMount() {
        this.refreshContactsState();
    }

    fetchContacts() {
        const contactsListPromise = fetch('./contacts')
                        .then( result => result.json());
        return contactsListPromise;
    }

    refreshContactsState() {
        this.fetchContacts()
            .then( contacts => this.setState({contacts}));
    }

    showNotification( mode, msg) {
        if( mode && msg ) {
            this.setState({
                showStatusPanel: true,
                statusMode: mode,
                statusMessage: msg
            });
        }
    }

    onStatusPanelClose() {
        this.setState({
            showStatusPanel: false,
            statusMessage: '',
            statusMode: ''
        });
    }

    render() {
        return (
            <Grid fluid={true}>
                <h1>Contacts</h1>
                <ContactList contacts = {this.state.contacts} 
                    refreshContactList={this.refreshContactsState}
                    showNotification={this.showNotification}/>
                <NewContact onNewContactAddition={this.refreshContactsState}
                    showNotification={this.showNotification}/>
                <StatusPanel mode={this.state.statusMode} 
                    msg={this.state.statusMessage} 
                    show={this.state.showStatusPanel}
                    onClose={this.onStatusPanelClose}/>
            </Grid>
        );
    }
}

export default App;