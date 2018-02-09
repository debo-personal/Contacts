import React from 'react';
import {Row, Col} from 'react-bootstrap';

const ContactRow = (props)=>{
    return (
        <Row>
            <Col sm={1}>
                <span>{props.contact.id}</span>
            </Col>
            <Col sm={2}>
                <span>{props.contact.name}</span>
            </Col>
            <Col sm={2}>
                <span>{props.contact.category}</span>
            </Col>
            <Col sm={3}>
                <span>{props.contact.email}</span>
            </Col>
            <Col sm={2}>
                <span>{props.contact.phone}</span>
            </Col>
            <Col sm={1}>
                    <span>Edit</span>
                </Col>
            <Col sm={1}>
                <span>Delete</span>
            </Col>
        </Row>
    );
};

export default ContactRow;