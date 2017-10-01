import React, { Component } from 'react';
import Champion from './champion';

class MatchSmall extends Component {
    constructor(props){
        super(props);
        this.state = { showChamp: false };
        this.pauseForRateLimiting = this.pauseForRateLimiting.bind(this);
    }
    pauseForRateLimiting(){
        // Does getting champions api hit rate limit?
        let that = this;
        setTimeout(() => {
            this.setState({showChamp: true});
        }, 2000);
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({showChamp: true});
        }, 2000);
    }
    displayChamp(){
        if(this.state.showChamp){ return <Champion apiRoute={`champion/${this.props.champion}`}  />;}
        return null;
    }
    render() {
        return (
            <div className='match-card card-border'>
                {this.displayChamp()}
                <div className='match-detail'>
                    <span>ROLE: {this.props.role}</span>
                    <span>LANE: {this.props.lane}</span>
                </div>
            </div>
        );
    }
}

export default MatchSmall;
