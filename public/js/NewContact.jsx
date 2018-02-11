import React from 'react';
import {Form, FormGroup, FormControl} from 'react-bootstrap';
import SubmitButton from './Common/SubmitButton';

class NewContact extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let contactReqObj = {
            "name" : this._name.value,
            "group": this._group.value,
            "email": this._email.value,
            "phone": this._phone.value
        };
        const saveReq = this.saveContact( contactReqObj );
        saveReq
        .then((res)=> {
            if(res.status === 200) {
                this.props.showNotification("success", "Contact created successfully");
                this.props.onNewContactAddition();
                this.clearContactInputs();
            }
            else {
                this.props.showNotification("danger", "There is some error while creating the contact.");
            }
            return res.json();
        });
        
        return saveReq;
    }

    saveContact( contact ) {
        const xhrReq = fetch('./contacts',{
            method: 'POST',
            body: JSON.stringify(contact),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        });
        return xhrReq;
    }

    clearContactInputs() {
        this._name.value = "";
        this._group.value = "";
        this._email.value = "";
        this._phone.value = "";
    }

    render() {
        /*I have used uncontrolled input here, we should switch back to controlled input while introding validation */
        return (
            <div>
                <h3>Add New Contact:</h3>
                <Form inline>
                    <FormGroup controlId="formInlineName" bsClass="mr10 form-group">
                        <FormControl type="text" placeholder="Name" inputRef={input => {this._name = input;}}/>
                    </FormGroup>
                    <FormGroup controlId="formInlineEmail" bsClass="mr10 form-group">
                        <FormControl type="email" placeholder="Group" inputRef={input => {this._group = input;}}/>
                    </FormGroup>
                    <FormGroup controlId="formInlineEmail" bsClass="mr10 form-group">
                        <FormControl type="email" placeholder="Email" inputRef={input => {this._email = input;}}/>
                    </FormGroup>
                    <FormGroup controlId="formInlineEmail" bsClass="mr10 form-group">
                        <FormControl type="email" placeholder="Phone" inputRef={input => {this._phone = input;}}/>
                    </FormGroup>
                    <SubmitButton btnStyle="primary" onClick={this.handleClick}>Add</SubmitButton>
                </Form>
            </div>
        );
    }
}

export default NewContact; 