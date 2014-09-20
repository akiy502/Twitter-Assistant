(function(exports){
    'use strict';

    exports.Metrics = React.createClass({
        getInitialState: function(){
            return {detailView: undefined};
        },
        
        /*
            {
                name: string
                values: [
                    {
                        class: string,
                        title: string,
                        percent: number (between 0 and 100)
                        detailFunction : () => ReactComponent
                    }
                ]
            }
        */
        render: function(){
            const data = this.props;
            const state = this.state;
            
            const {name, values} = data;
            
            const fractionContainerClasses = ["fraction-container"];
            var fractionContainerChildren;
            
            if(values.length === 1){
                const value = values[0];
                const times = Math.floor(value.percent/100);
                const rest = value.percent - times*100;
                
                fractionContainerClasses.push( times <= 5 ? ('x'+times+'-'+(times+1)) : 'lots' )
                
                fractionContainerChildren = times <= 5 ?
                    React.DOM.div( {
                        className: ["value", value.class].filter(s => !!s).join(' '),
                        title: value.title,
                        style: {
                            width: rest.toFixed(1)+'%'
                        }
                    }) :
                    value.percent.toFixed(1) + '%';
            }
            else{
                fractionContainerChildren = values.map(v => {
                    const clickable = typeof v.detailFunction === 'function';
                    
                    return React.DOM.div( {
                        className: ["value", v.class, clickable ? 'clickable' : ''].filter(s => !!s).join(' '),
                        title: v.title,
                        style: {
                            width: v.percent.toFixed(1)+'%'
                        },
                        onClick: !clickable ? undefined : function(){
                            this.setState({detailView: v})
                        }
                    });
                });
            }
            
            return React.DOM.div( {className: "metrics"}, [
                React.DOM.div( {className: "name"}, name ),
                React.DOM.div(
                    {className: fractionContainerClasses.join(' ')},
                    fractionContainerChildren
                )
            ])
        }
        
    });
    
})(this);
