var React = require('react');

module.exports = React.createClass({
  propTypes: {
    autoLockScroll: React.PropTypes.bool,
    isShow: React.PropTypes.bool,
    onTap: React.PropTypes.func
  },

  _originalBodyOverflow: '',

  componentDidMount: function(){
    this._originalBodyOverflow = document.getElementsByTagName('body')[0].style.oveflow;
    if (this.props.autoLockScroll){
      this._disableScroll();
    }
  },

  componentWillUnmount: function(){
    this._enableScroll();
  },

  componentDidUpdate: function(){
    if(this.props.autoLockScroll){
      this.props.isShow ? this._disableScroll() : this._enableScroll();
    }
  },

  render: function(){
    return (
      <div 
        className="mask"
        onTouchTap={this._onTap} >
      </div>
    );
  },

  _disableScroll: function(){
    document.getElementsByTagName('body')[0].style.oveflow = 'hidden';
  },

  _enableScroll: function(){
    document.getElementsByTagName('body')[0].style.oveflow = this._originalBodyOverflow;
  },

  _onTap: function(e){
    this.props.onTap && this.props.onTap(e);
  }
});


