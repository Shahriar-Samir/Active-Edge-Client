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



const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {
    
    const [searchParams,setSearchParams] = useSearchParams()
    const [slotId,setSlotId] = useState(searchParams.get('slotId'))
    const [type,setType] = useState(searchParams.get('type'))
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)

    const {data:slot} = useQuery({
        queryKey:["slot"],
        queryFn: ()=>
            axiosSecure.get(`/trainerSlot/${slotId}`)
            .then(res=>{
                return res.data
            }),
        enabled: !!user
    })


    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOutForm/>
            </Elements>
        </div>
    );
};

export default Payment;