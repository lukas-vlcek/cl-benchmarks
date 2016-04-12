var AppComponent = React.createClass({
    displayName: "AppComponent",
    render: function() {
        console.log("this.state:", this.state);
        // console.log('this.props:', this.props);

        var reactElement = (this.state && this.state.params && this.state.params.view === AppConstant.VIEW_DETAIL) ?
            React.createElement(DetailComponent, {}) :
            React.createElement(MasterComponent, {
                chartClickHandler: this.props.chartClickHandler
            });

        return reactElement;
    }
});