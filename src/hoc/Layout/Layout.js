import React, { Component } from 'react';

import Aux from '../Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/Sidedrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer} 
        })
    }

    render () {
        return (
            <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className='Content'>
            {this.props.children}
        </main>
    </Aux>
        );
    }
}

export default Layout;