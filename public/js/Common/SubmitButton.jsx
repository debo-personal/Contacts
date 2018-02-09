import React from 'react';
import {Button} from 'react-bootstrap';

class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading : false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            isLoading: true
        });
        this.props.onClick().then(() => {
            this.setState({
                isLoading : false
            });
        });
    }

    render() {
        const {isLoading} = this.state; //used ES6 destructuring, m new to use it, so adding this comment
        const btnStyle = this.props.btnStyle || "primary";
        return (
            <Button
                bsStyle={btnStyle}
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : null}
            >
                {!isLoading ? this.props.children : "Adding.."}
            </Button>
        );
    }
}

export default SubmitButton;