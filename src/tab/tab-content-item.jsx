var React = require('react');

module.exports = React.createClass({
  propTypes: {
    index: React.PropTypes.number,
    selected: React.PropTypes.bool,
    onTapContent: React.PropTypes.func,
    className: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      index: 0,
      selected: false
    };
  },

  render: function(){
    var props = this.props,
      itemCls = "tab-content-item";
    if(props.className){
      itemCls += ' '+props.className;
    }
    return (
      <div
        className={itemCls+ (props.selected ? " selected" : " hide")}
        onTouchTap={this._onTap} >
        {props.children}
      </div>
    );
  },

  _onTap: function(e){
    var props = this.props;
    props.onTapContent && props.onTapContent(props.index, this, e);
  }
});