import React, {Component} from 'react';

export default function hydrateWithApi(UnwrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
            }
        }
        componentDidMount() {
            fetch(`/api/${this.props.apiRoute}`)
            .then(res => res.json())
            .then(data => this.setState({data: data}));
        }
        renderIfFetched(){
            if(this.state.data != null){
                console.log(this.state.data);
                return <UnwrappedComponent {...this.state.data} />
            } else {
                return <span/>
            }
        }
        render() {
            return this.renderIfFetched();
        }
    }
}