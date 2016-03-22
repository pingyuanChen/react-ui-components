var React         = require('react');
var ReactDOM      = require('react-dom');
var Menu          = require('./menu');
var Tooltip       = require('../tooltip');
var DelegateClick = require('../mixins/delegate-click');

module.exports = React.createClass({
  mixins: [DelegateClick],

  propTypes: {
    menuItems: React.PropTypes.array.isRequired, //an array for rendering dropdown menu items
    wrapClassName: React.PropTypes.string,
    itemTpl: React.PropTypes.func,   //custom template for each menu items
    selectedTpl: React.PropTypes.func,   //custom template for selected item showing
    selectedIndex: React.PropTypes.number,
    onMenuChange: React.PropTypes.func,
    forceTap: React.PropTypes.bool,  //force trigger onMenuChange unconditional
    tooltip: React.PropTypes.string,
    tipClass: React.PropTypes.string,
    isScroll: React.PropTypes.bool   //Whether scrolling menu items
  },

  getDefaultProps: function(){
    return {
      hasMask: false,
      autoWidth: false,
      tooltip: '',
      tipClass: '',
      displayKey: 'text',  //the value of displayKey for displaying
      valKey: 'value',  //the value of valKey may be for being sended to sever
      itemTpl: function(index, data, displayKey, valKey){
        var displayText = data[displayKey],
          displayVal = data[valKey];
        return (<div data-val={displayVal}>{displayText}</div>);
      },
      selectedTpl: function(index, data, displayKey, valKey){
        var displayText = data[displayKey];
        return (<div>{data[displayText]}</div>);
      }
    };
  },

  getInitialState: function(){
    return {
      open: false,   
      selectedIndex: this.props.selectedIndex || 0,
      isShowTip: false,
      hovered: false,
    };
  },

  componentDidMount: function(){
    if(this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props.selectedIndex);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.autoWidth) this._setWidth();

    if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps.selectedIndex);
    }
  },

  render: function(){
    var props = this.props,
      showClassName = this.state.open ? "" : "unactive",
      wrapClassName = props.wrapClassName+' d-menu-wrap '+showClassName,
      tooltipEle, 
      hoveredClass = this.state.hovered ? 'hovered' : '';
    if(props.tooltip){
      tooltipEle = (
        <Tooltip
          ref="tooltip"
          tip={props.tooltip}
          isShow={this.state.isShowTip}
          customClass={props.tipClass} >
        </Tooltip>
      );
    }

    return (
      <div 
        className={wrapClassName}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave} >
        <div className="d-menu-display-wrap" onTouchTap={this._onToggleMenu}>
          {props.selectedTpl(this.state.selectedIndex, props.menuItems[this.state.selectedIndex], props.displayKey, props.valKey)}
          {tooltipEle}
        </div>
        <Menu
          ref="menuWrap"
          menuItems={props.menuItems}
          displayKey={props.displayKey}
          valKey={props.valKey}
          isScroll={props.isScroll}
          selectedIndex={this.state.selectedIndex}
          itemTpl={props.itemTpl}
          onItemTap={this._onItemTap} >
        </Menu>
        {this.state.open && props.hasMask && <div className='d-menu-mask' onTouchTap={this._onMenuMaskTap}></div>}
      </div>
    );
  },

  componentClick: function(){
    this.close();
  },

  close: function(){
    if(this.state.open){
      this.setState({
        open: false
      });
    }
  },

  _onToggleMenu: function(){
    this.setState({
      open: !this.state.open,
      isShowTip: this.state.open
    });
  },

  _onItemTap: function(e, index, data){
    var props = this.props;
    if(props.onMenuChange){
      if(this.state.selectedIndex !== index || props.forceTap){
        props.onMenuChange(e, index, data);
      }
    }

    this.setState({
      selectedIndex: index,
      open: false
    });
  },

  _onMenuMaskTap: function(){
    this.setState({
      open: false
    });
  },

  _setWidth: function(){
    var dMenuEle = ReactDOM.findDOMNode(this),
      menuWrap = ReactDOM.findDOMNode(this.refs.menuWrap);
    dMenuEle.style.width = menuWrap.offsetWidth + 'px';
  },

  _setSelectedIndex: function(selectedIndex){
    this.setState({
      selectedIndex: selectedIndex
    });
  },

  _handleMouseEnter: function(e){
    this.setState({
      isShowTip: this.state.open ? false : true,
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


