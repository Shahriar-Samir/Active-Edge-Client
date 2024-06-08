import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
} from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';



const stripePromise =  loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOutForm/>
            </Elements>
        </div>
    );
};

export default Payment;