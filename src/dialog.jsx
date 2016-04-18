var React          = require('react');
var ReactDOM       = require('react-dom');
var WindowListener = require('./mixins/window-listener');
var SimpleButton   = require('./buttons/simple-button');
var Mask           = require('./mask');

module.exports = React.createClass({
  mixins: [WindowListener],

  propTypes: {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    headTpl: React.PropTypes.func,
    bodyTpl: React.PropTypes.func,
    footTpl: React.PropTypes.func,
    hasMask: React.PropTypes.bool,
    hasActions: React.PropTypes.bool,  //whether has actions in footer
    actions: React.PropTypes.array,
    onShow: React.PropTypes.func,
    onClose: React.PropTypes.func,
    open: React.PropTypes.bool
  },

  getDefaultProps: function(){
    return {
      hasMask: true,
      hasActions: true,
      customClass: '',
      actions: [
        {
          customClass: 'dialog-submit',
          onTap: this._onSubmit,
          label: "submit"
        },
        {
          customClass: 'dialog-cancel',
          onTap: this.close,
          label: "cancel"
        }
      ]
    };
  },

  getInitialState: function(){
    return {
      open: this.props.open || false
    };
  },

  windowListeners: {
    resize: '_onResize'
  },

  componentDidMount: function(){
    setTimeout(function(){
      this._onResize();
    }.bind(this), 300);

    if(this.props.open){
      this._onShow();
    }
  },

  componentWillReceiveProps: function(nextProps){
    if(nextProps.open !== undefined && nextProps.open !== this.props.open){
      this.setState({
        open: nextProps.open
      });
    }
  },

  componentDidUpdate: function(){
    this._onResize();
  },

  render: function(){
    var props = this.props,
      actions = props.actions,
      actionEles = [], actionEle, item,
      dialogWrapStyle = {};

    if(props.hasActions){
      for(var i=0,l=actions.length; i<l; i++){
        item = actions[i];
        if(item.tpl){
          actionEle = item.tpl(item);
        }else{
          actionEle = (
            <SimpleButton 
              key={i}
              customClass={item.customClass || ''}
              disabled={item.disabled || false}
              onTap={item.onTap || this.close}
              label={item.label} >
            </SimpleButton>
          );
        }
        actionEles.push(actionEle);
      }
    }
    if(this.state.open){
      dialogWrapStyle = {
        width: '100%',
        height: '100%'
      };
    }

    return (
      <div className={"dialog-wrap "+props.customClass} style={dialogWrapStyle} >
        {this.state.open &&
          <div ref="dialog" className="dialog">
            <div className="dialog-head">
              {props.headTpl ? props.headTpl(props.title) : props.title}
            </div>
            <div className="dialog-body">
              {props.bodyTpl ? props.bodyTpl(props.body) : props.body}
            </div>
            <div className="dialog-foot">
              {props.footTpl ? props.footTpl() : ''}
              {actionEles}
            </div>
          </div>
        }
        {this.state.open && this.props.hasMask &&
          <Mask
            autoLockScroll={true}
            isShow={true}
            onTap={this._handleMaskTap} >
          </Mask>
        }
      </div>
    );
  },

  show: function(){
    this.setState({open: true}, this._onShow);
  },

  close: function(){
    this.setState({open: false}, this._onClose);
  },

  _onShow: function(){
    this.props.onShow && this.props.onShow();
  },

  _onClose: function(){
    this.props.onClose && this.props.onClose();
  },

  _onSubmit: function(){
    this.setState({open: false});
    this.props.onClose(true)
  },

  _onResize: function(){
    if(this.state.open){
      var dialogWin = ReactDOM.findDOMNode(this.refs.dialog),
        dialogWinWidth = dialogWin.offsetWidth,
        dialogWinHeight = dialogWin.offsetHeight;
      dialogWin.style.marginLeft = -dialogWinWidth/2 + 'px';
      dialogWin.style.marginTop = -dialogWinHeight/2 + 'px';
    }
  },

  _handleMaskTap: function(e){
    this.close();
  }
});




















