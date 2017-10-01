import React, { Component } from 'react';
import hydrate from './hydrate-middleware';
import Match from './match-small';

class MatchList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='matchlist-root'>
                {this.props.matches.map((match, i) => {
                    console.log(match);
                    return <Match {...match} key={i}/>
                })}
            </div>
        );
    }
}

let HydratedMatchList = hydrate(MatchList);

export default HydratedMatchList;
