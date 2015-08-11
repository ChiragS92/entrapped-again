import React from 'react/addons';
import { Router, Link } from 'react-router';
import Api from '../api/api.js';

import Blocks from './Blocks.jsx';

import MinesStore from '../stores/minestore.js';

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
  }

   handleClick(e) {
    var msg = "data:exit:[idx = 5 ]";
    Api.send(msg);
    return false;
  }

  handleClick1(e) {
    var msg = "data:new";
    Api.send(msg);
    return false;
  }
  
  render() {
    var cx = React.addons.classSet;
    var classes = cx({
      'minefield': true,
      'minefield__enemy': this.props.of === "enemy",
      'minefield__user': this.props.of === "player"
    });

    var nodes = [];
    for (var i = 1; i <= 6; i++) {
      var classname = "fa fa-2x fa-heartbeat heart-icons";

      if (i <= this.props.player.life) {
        classname = classname + " life-status__active";
      }
      
      nodes.push(<i key={"heart" + i} className={classname}></i>);
    }

    return (
      <div className={classes}>
        <Blocks size={this.props.player.size} mines={this.props.player.mines} of={this.props.of} />
        <div className="life-status">
          <span>
            {nodes} 
          </span>
        </div>
        <h2 className="minefield__text--instructions">{this.props.player.username}</h2>
        <Link to="/home" onClick={this.handleClick}>Exit</Link>
        <br />
        <Link to="/minefield" onClick={this.handleClick1}>New Game</Link>
      </div>
    )
  }
};
Field.propTypes = { of: React.PropTypes.string, player: React.PropTypes.object };
Field.defaultProps = { of: 'user', player: {} };

export default Field;
