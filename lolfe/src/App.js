import React, { Component } from 'react';
import './App.css';
import Modal from './components/modal';
import PlayerCard from './components/player-card';
import MatchList from './components/match-list';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }

    this.setUsername = this.setUsername.bind(this);
  }
  setUsername(input) {
    this.setState({ username: input });
  }

  renderModal() {
    return (this.state.username === '') ? <Modal onSubmit={this.setUsername} /> : null;
  }
  renderUsername() {
    return (this.state.username === '') ? null : `: ${this.state.username}`;
  }
  renderPlayerCard() {
    return (this.state.username === '') ? null :
      <PlayerCard apiRoute={`account/${this.state.username}`} />
      ;
  }
  renderMatchList() {
    return (this.state.username === '') ? null :
      <MatchList apiRoute={`matchlist/${this.state.username}`} />
      ;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>lolstats{this.renderUsername()}</h1>
        </header>
        {this.renderPlayerCard()}
        {this.renderMatchList()}
        {this.renderModal()}
      </div>
    );
  }
}

export default App;
