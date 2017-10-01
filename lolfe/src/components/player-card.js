import React, { Component } from 'react';
import hydrate from './hydrate-middleware';

let avatarUrl = 'http://opgg-static.akamaized.net/images/profile_icons/profileIcon';

class PlayerCard extends Component {
    render() {
        return (
            <div className='profile-row card-border'>
                <div className='avatar-div'>
                    <img className='avatar-img'
                        src={`${avatarUrl}${this.props.profileIconId}.jpg`} 
                        alt={'avatar'}/>
                </div>
                <div className='profile-details'>
                    <span className={'profile-id'}>{this.props.name}</span>
                    <span className={'profile-level'}>Summoner Level: {this.props.summonerLevel}</span>
                </div>
            </div>
        )
    }
}

let HydratedPlayerCard = hydrate(PlayerCard);
export default HydratedPlayerCard;
