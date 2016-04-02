var React          = require('react');

var TabHeadItem    = require('./tab-head-item');
var TabContentItem = require('./tab-content-item');

module.exports = React.createClass({
  propTypes: {
    customClass: React.PropTypes.string,
    selectedIndex: React.PropTypes.number,
    tabWillChange: React.PropTypes.func,
    tabDidChange: React.PropTypes.func,
    onTapContent: React.PropTypes.func,
    disableSetWidth: React.PropTypes.bool
  },

  getInitialState: function(){
    return {
      selectedIndex: this.props.selectedIndex || 0
    };
  },
  
  render: function(){
    var props = this.props,
      tabHeads = [],
      tabContents = [],
      tempHead, tempContent,
      width;


    React.Children.forEach(props.children, function(item, index){
      if(item.type.displayName == 'TabItem'){
        if(props.disableSetWidth){
          tempHead = (
            <TabHeadItem
              key={index} 
              index={index}
              title={item.props.title}
              selected={this.state.selectedIndex === index}
              headTpl={props.headTpl}
              onTap={this._onHeadTap} >
            </TabHeadItem>
          );
        }else{
          width = 100/this.getTabCount() + '%';
          tempHead = (
            <TabHeadItem
              key={index} 
              index={index}
              title={item.props.title}
              selected={this.state.selectedIndex === index}
              width={width}
              headTpl={props.headTpl}
              onTap={this._onHeadTap} >
            </TabHeadItem>
          );
        }
        
        tempContent = (
          <TabContentItem 
            key={index}
            index={index}
            selected={this.state.selectedIndex === index}
            onTapContent={this._onTapContent} >
            {item.props.children}
          </TabContentItem>
        );
        tabHeads.push(tempHead);
        tabContents.push(tempContent);
      }else{
        console.error('The tab item tag name must be TagItem');
      }
    }.bind(this));

    return (
      <div className={"tab-wrap "+(props.customClass || "")} >
        <div className="tab-head-wrap">
          {tabHeads}
        </div>
        <div className="tab-content-wrap">
          {tabContents}
        </div>
      </div>
    );

  },

  getTabCount: function(){
    return React.Children.count(this.props.children);
  },

  _onHeadTap: function(index, title, e){
    var props = this.props;
    if(props.tabWillChange) props.tabWillChange(this.state.selectedIndex, index, e);
    this.setState({selectedIndex: index});
    if(props.tabDidChange) props.tabDidChange(index, title, e);
  },

  _onTapContent: function(index, activeTabContent, e){
    if(this.props.onTapContent) this.props.onTapContent(index, activeTabContent, e);
  }

});














