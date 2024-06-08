import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import {
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { toast, ToastContainer } from 'react-toastify';

const CheckOutForm = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const [slotId,setSlotId] = useState(searchParams.get('slotId'))
    const [type,setType] = useState(searchParams.get('type'))
    const [cardError,setCardError] = useState('')
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    const [clientSecret,setClientSecret] = useState()
    const [transactionId, setTransactionId] = useState()
    const price = 400

    const {data:slot} = useQuery({
        queryKey:["slot"],
        queryFn: ()=>
            axiosSecure.get(`/trainerSlot/${slotId}`)
            .then(res=>{
                return res.data
            }),
        enabled: !!slotId
    })
    console.log(slot)
    useEffect(()=>{
        axiosSecure.post(`/createPaymentIntent`, {price})
        .then(res=>{
            setClientSecret(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (e)=>{
        e.preventDefault()

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement)

        if(card === null){
                return
        }

        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            setCardError(error.message)
        }
        else{
            console.log(paymentMethod)
            setCardError('')
        }
        console.log(clientSecret)
        const {paymentIntent,error:errorPayment} = await stripe.confirmCardPayment(clientSecret.clientSecret, {
            payment_method:{
                card: card,
                billing_details: {
                    email : user?.email || 'anon',
                    name : user?.displayName || 'anon' 
                }
            }
        })

        if(errorPayment){
            console.log(errorPayment.type)
        }
        else{
            if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id)
                const transactionId = paymentIntent.id
                const trainerName = slot.displayName
                const packageName = type
                const trainerUid = slot.uid
                const trainerEmail = slot.email
                const memberName = user?.displayName
                const memberUid = user?.uid
                const memberEmail = user?.email
                axiosSecure.post('/addPayment', {transactionId, trainerName, trainerEmail, trainerUid, packageName, price, memberName, memberEmail, memberUid})
                .then(()=>{
                    toast.success('Payment Success')
                })
                .catch(()=>{
                    toast.error('Something went wrong')
                })
            }
        }
    }


    

    return (
        <div>
            <ToastContainer/>
           <form onSubmit={handlePayment}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" className='btn' disabled={!stripe || !clientSecret}>
        Pay
      </button>
    </form>
    <p className='text-error'>{cardError}</p>
    {transactionId && <p className='text-success'>{transactionId}</p>}
        </div>
)
}

export default CheckOutForm;