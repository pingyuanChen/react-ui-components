var React = require('react');

module.exports = React.createClass({
  propTypes: {
    index: React.PropTypes.number.isRequired,
    selected: React.PropTypes.bool,
    data: React.PropTypes.object,
    onTap: React.PropTypes.func,
    itemTpl: React.PropTypes.func
  },

  getDefaultProps: function(){
    return {
      itemTpl: function(index, data, selected, displayKey, valKey){
        var displayText = data[displayKey],
          displayVal = data[valKey];
        return (<div data-val={displayVal}>{displayText}</div>);
      }
    };
  },

  render: function(){
    var props = this.props,
      itemClassName = 'menu-item',
      hoveredClass = this.state.hovered ? 'hovered' : '';
    if(hoveredClass){
      itemClassName += ' '+hoveredClass;
    }
    if(props.selected){
      itemClassName += ' menu-item-selected';
    }
    return (
      <div 
        className={itemClassName}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onTouchTap={this._onTap} > 
        {props.itemTpl(props.index, props.data, props.selected, props.displayKey, props.valKey)}
      </div>
    );
  },

  _onTap: function(e){
    var props = this.props;
    if(props.onTap){
      props.onTap(e, props.index, props.data);
    }
  },

  _handleMouseEnter: function(e){
    this.setState({
      hovered: true
    });
  },

  _handleMouseLeave: function(e){
    this.setState({
      hovered: false
    });
  }

});