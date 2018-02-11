import React from 'react';
import {Alert} from 'react-bootstrap';

const StatusPanel = (props) => {
    if( props.show ) {
        return (
            <Alert bsStyle={props.mode} onDismiss={props.onClose}>
                <p>{props.msg}</p>
            </Alert>
        );
    }
    else {
        return null;
    }
}

export default StatusPanel;
