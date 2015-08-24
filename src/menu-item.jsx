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
      itemClassName = 'menu-item';
    if(props.selected){
      itemClassName += ' menu-item-selected';
    }
    return (
      <div 
        className={itemClassName}
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
  }

});