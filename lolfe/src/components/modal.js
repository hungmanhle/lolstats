import React, { Component } from 'react';

class InputModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({text: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state.text);
        this.setState({text: ''});
    }
    render() {
        return (
            <div className={'modal-outer'}>
                <div className={'modal-inner'}>
                    <form onSubmit={this.onSubmit}>
                        <input 
                            className="modal-input"
                            type="text"
                            placeholder="Type in your username..."
                            value={this.state.text}
                            onChange={this.onChange}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default InputModal;
