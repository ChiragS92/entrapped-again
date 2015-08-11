import React from 'react';
import { Router, Link } from 'react-router';

import MinesStore from '../stores/minestore.js';

class Error extends React.Component {

  render() {
    return (
      <div className="error">
        <h1 className="error__title">Nickname already used!</h1>
      </div>
    )
  }
};

export default Error;
