var React = require('react');
var Tooltip = require('../tooltip');

module.exports = React.createClass({
  propTypes: {
    customClass: React.PropTypes.string,
    tooltip: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onBtnTap: React.PropTypes.func,
    isShowTip: React.PropTypes.bool,
    tipClass: React.PropTypes.string,
    iconBtnClass: React.PropTypes.string,
    iconBtnTpl: React.PropTypes.func
  },

  getDefaultProps: function(){
    return {
      customClass: ''
    };
  },

  getInitialState: function(){
    return {
      isShowTip: false,
      hovered: false,
      tipClass: ''
    };
  },

  render: function(){
    var props = this.props,
      tooltipEle, 
      hoveredClass = this.state.hovered ? 'hovered' : '';
    if(props.tooltip){
      tooltipEle = (
        <Tooltip
          ref="tooltip"
          tip={props.tooltip}
          isShow={this.state.isShowTip} 
          customClass={props.tipClass}>
        </Tooltip>
      );
    }

    return (
      <span 
        className={"icon-btn-wrap " + hoveredClass + ' '+props.customClass}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
        onTouchTap={props.onBtnTap} >
        <span className={"icon-btn "+props.iconBtnClass} >
          {props.iconBtnTpl ? props.iconBtnTpl() : ''}
        </span>
        {tooltipEle}
      </span>
    );
  },

  _handleMouseEnter: function(e){
    this.setState({
      isShowTip: true,
      hovered: true
    });
  },

  _handleMouseLeave: function(e){
    this.setState({
      isShowTip: false,
      hovered: false
    });
  }
});
























