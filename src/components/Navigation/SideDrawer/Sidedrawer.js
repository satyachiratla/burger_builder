import React from 'react';
import Aux from '../../../hoc/Aux';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Sidedrawer.css';


const sideDrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"]
    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"]
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}  />
        <div className={attachedClasses.join(' ')}> 
            <Logo height="11%" />
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
}

export default sideDrawer