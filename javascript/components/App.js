var AppComponent = React.createClass({
    displayName: "AppComponent",
    render: function() {
        // console.log("this.state:", this.state);
        // console.log('this.props:', this.props);

        var reactElement = null;
        if (this.state && this.state.path && this.state.path.substr(1).startsWith(AppConstant.VIEW_DETAIL)) {
            reactElement = React.createElement(DetailComponent, this.state.params)
        } else {
            reactElement = React.createElement(MasterComponent, {
                chartClickHandler: this.props.chartClickHandler
            });
        }

        return reactElement;
    }
});