import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends Component {
  render() {
    return (
      <div data-testid="game-page">
        <Header />
      </div>
    );
  }
}

export default connect()(Game);
