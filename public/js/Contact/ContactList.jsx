import React from "react";
import {Grid} from 'react-bootstrap';
import ContactRow from './ContactRow';

class ContactList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let contactRows = [];
        if(this.props && this.props.contacts && this.props.contacts.length) {
            contactRows = this.props.contacts.map((contact)=>{
                return <ContactRow key={contact.id} contact={contact} 
                    refreshContactList={this.props.refreshContactList}
                    showNotification={this.props.showNotification}/>;
            });
        }
        return (
            <Grid fluid={true}>
                {contactRows}
            </Grid>
        );
    }
}

export default ContactList;

