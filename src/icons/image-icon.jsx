var React = require('react');

module.exports = React.createClass({
  propTypes: {
    customClass: React.PropTypes.string,
    defaultImg: React.PropTypes.string,
    realImg: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      defaultImg: '',
      realImg: ''
    };
  },

  componentDidMount: function(){
    var img,
      self = React.findDOMNode(this),
      src = this.props.realImg;
    if(src){
      img = document.createElement('img');
      $(img)
        .bind("load", function() {
          self.parent().css('backgroundImage','url('+src+')  !important');
          self.css('visibility','hidden');
        })
        .bind('error',function(){
          self.css('visibility','visible');
        })
        .attr("src", src);
    }
  },

  render: function(){
    var props = this.props;

    return (
      <div className={"img-wrap "+props.customClass} >
        <img 
          data-real={props.realImg}
          src={props.defaultImg} />
      </div>
    );
  }

});


