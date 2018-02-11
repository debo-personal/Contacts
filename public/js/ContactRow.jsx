import React from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';

class ContactRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode : false,
            contact: {
                id : this.props.contact.id,
                name : this.props.contact.name,
                group : this.props.contact.category,
                email : this.props.contact.email,
                phone : this.props.contact.phone
            }
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
    }

    onNameChange(event) {
        let contact = Object.assign({}, this.state.contact);
        contact.name = event.target.value;
        this.setState({contact});
    }

    onCategoryChange(event) {
        let contact = Object.assign({}, this.state.contact);
        contact.group = event.target.value;
        this.setState({contact});
    }

    onEmailChange(event) {
        let contact = Object.assign({}, this.state.contact);
        contact.email = event.target.value;
        this.setState({contact});
    }

    onPhoneChange(event) {
        let contact = Object.assign({}, this.state.contact);
        contact.phone = event.target.value;
        this.setState({contact});
    }

    handleEditClick(id) {
        this.setState({
            isEditMode: true
        });
    }

    handleUpdateClick(id) {
        let contact = this.state.contact;
        this.updateContact(id, contact).then((response)=>{
            if(response.status === 200) {
                this.props.refreshContactList();
                this.props.showNotification("success", "Contact updated Successfully!");
            }
            else {
                this.props.showNotification("danger", "There is some error while updating the contact.");
            }
            this.setState({
                isEditMode: false
            });
        });
    }

    updateContact(id, contact) {
        const xhrReq = fetch('./contacts/' + id,{
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        });
        return xhrReq;
    }

    handleDeleteClick(id) {
        this.deleteContact(id).then((response) => {
            if(response.status === 200) {
                this.props.refreshContactList();
                this.props.showNotification("success", "Contact Deleted Successfully!");
            }
            else {
                this.props.showNotification("danger", "There is some error while deleting the contact.");
            }
        });
    }

    deleteContact(id) {
        const xhrReq = fetch('./contacts/' + id,{
            method: 'DELETE',
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        });
        return xhrReq;
    }

    render() {
        let nameField, categoryField, emailField, phoneField, editBtn;
        if(this.state.isEditMode) {
            nameField = <input type="text" className="form-control" value={this.state.contact.name} onChange={this.onNameChange}/>;
            categoryField = <input type="text" className="form-control" value={this.state.contact.group} onChange={this.onCategoryChange}/>;
            emailField = <input type="text" className="form-control" value={this.state.contact.email} onChange={this.onEmailChange}/>;
            phoneField = <input type="text" className="form-control" value={this.state.contact.phone} onChange={this.onPhoneChange}/>;
            editBtn = (<Button onClick={(e) => {this.handleUpdateClick(this.state.contact.id)}}>
                            <Glyphicon glyph="ok"/>
                        </Button>);
        }
        else {
            nameField = <span>{this.props.contact.name}</span>;
            categoryField = <span>{this.props.contact.category}</span>;
            emailField = <span>{this.props.contact.email}</span>;
            phoneField = <span>{this.props.contact.phone}</span>;
            editBtn = (<Button onClick={(e) => {this.handleEditClick(this.props.contact.id)}}>
                            <Glyphicon glyph="pencil"/>
                        </Button>);
        }

        return (
            <Row bsClass="row mb10">
                <Col sm={1}>
                    <span>{this.props.contact.id}</span>
                </Col>
                <Col sm={2}>
                    {nameField}
                </Col>
                <Col sm={2}>
                    {categoryField}
                </Col>
                <Col sm={3}>
                    {emailField}
                </Col>
                <Col sm={2}>
                    {phoneField}
                </Col>
                <Col sm={1}>
                    {editBtn}
                </Col>
                <Col sm={1}>
                    <Button onClick={(e) => {this.handleDeleteClick(this.props.contact.id)}}>
                        <Glyphicon glyph="trash"/>
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default ContactRow;