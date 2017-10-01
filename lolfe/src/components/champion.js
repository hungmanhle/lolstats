import React, {Component} from 'react';
import hydrate from './hydrate-middleware';

let champImgUrl = 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/';

class ChampCard extends Component {
    render(){
        return (
            <div className='champion'>
                <img src={`${champImgUrl}${this.props.image.full}`} alt={this.props.name} />
                <span className='champion-name'>{this.props.name}</span>
            </div>
        )
    }
}

let HydratedChampCard = hydrate(ChampCard);

export default HydratedChampCard;
