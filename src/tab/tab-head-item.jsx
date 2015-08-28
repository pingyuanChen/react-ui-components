var React = require('react');

module.exports = React.createClass({
  propTypes: {
    index: React.PropTypes.number,
    title: React.PropTypes.string,
    selected: React.PropTypes.bool,
    headTpl: React.PropTypes.func,
    onTap: React.PropTypes.func
  },

  getDefaultProps: function(){
    return {
      index: 0,
      selected: false
    };
  },
  
  render: function(){
    var props = this.props,
      style = {
        width: props.width
      },
      titleEle;
    if (props.headTpl){
      titleEle = props.headTpl(props.title, props.selected);
    }else{
      titleEle = props.title;
    }

    return (
      <div 
        className={"tab-head-item "+ (props.selected ? "selected" : "")} 
        style={style}
        onTouchTap={this._onTap} >
        {titleEle}
      </div>
    );
  },

  _onTap: function(e){
    this.props.onTap && this.props.onTap(this.props.index, this.props.title, e);
  }
});