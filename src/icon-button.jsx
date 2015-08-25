var React = require('react');
var Tooltip = require('./tooltip');

module.exports = React.createClass({
  propTypes: {
    tooltip: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onBtnTap: React.PropTypes.func,
    isShowTip: React.PropTypes.bool,
    tipClass: React.PropTypes.string,
    iconBtnClass: React.PropTypes.string,
    iconBtnTpl: React.PropTypes.func
  },

  getInitialState: function(){
    return {
      isShowTip: false,
      hovered: false
    };
  },

  render: function(){
    var props = this.props,
      tooltipEle, 
      tipClass = props.tipClass || '',
      hoveredClass = this.state.hovered ? 'hovered' : '';
    if(props.tooltip){
      tooltipEle = (
        <Tooltip
          ref="tooltip"
          tip={props.tooltip}
          isShow={this.state.isShowTip} 
          customClass={tipClass}>
        </Tooltip>
      );
    }

    return (
      <span 
        className={"icon-btn-wrap " + hoveredClass}
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
























