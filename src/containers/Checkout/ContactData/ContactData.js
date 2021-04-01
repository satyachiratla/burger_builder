import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipcode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
         this.setState( { loading: true } );
         const order = {
             ingredients: this.props.ingredients,
             price: this.state.totalPrice,
             customer: {
                 name: 'Vivek Chowdary',
                 address: {
                     street: 'Pallapu Street',
                     zipCode: '533344',
                     country: 'India'
                 },
                 email: 'satyachiratla77@gmail.com'
             },
             deliveryMethod: 'fastest'
         }
         axios.post( '/orders.json', order )
             .then( response => {
                 this.setState( { loading: false } );
                 this.props.history.push('/');
             } )
             .catch( error => {
                 this.setState( { loading: false } );
             } );
    }

    render () {
        let form = (
            <form>
                <input className="Input" type='text' name="name" placeholder="Your Name" />
                <input className="Input" type="email" name="email" placeholder="Your Email" />
                <input className="Input" type='text' name="street" placeholder="Street" />
                <input className="Input" type='text' name="zip" placeholder="zipcode" />
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                <h4> Enter Your Contact Data </h4>
                {form}
                <Button btnType="Success">ORDER</Button>
            </div>
        );
    }
}

export default ContactData;
