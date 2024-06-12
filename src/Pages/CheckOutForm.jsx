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
import Loading from '../Components/Loading';

const CheckOutForm = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const [slotId,setSlotId] = useState(searchParams.get('slotId'))
    const [type,setType] = useState(searchParams.get('type'))
    const [cardError,setCardError] = useState('')
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    const [clientSecret,setClientSecret] = useState()
    const [transactionId, setTransactionId] = useState()
    const price = type === 'basic'? 20 : type==='standard'? 50 : type==='premium'? 100 : 0

    const {data:slot,isLoading} = useQuery({
        queryKey:["slot"],
        queryFn: ()=>
            axiosSecure.get(`/trainerSlot/${slotId}`)
            .then(res=>{
                return res.data
            }),
        enabled: !!slotId
    })

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
            toast.error(errorPayment.message)
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

    if(isLoading){
        return <Loading/>
    }
    

    return (
       <div className='w-11/12 max-w-[1200px] mx-auto h-[100vh]'>
            <ToastContainer/>
         <div className='flex flex-col justify-center items-center h-full'>
         
         <form onSubmit={handlePayment} className='w-11/12 max-w-[500px] bg-gray-100 p-10 mx-auto'>
         <h1 className='text-4xl font-bold text-center'>Payment</h1>
      <div className='mt-10  flex flex-col'>
      <div className='flex justify-between border-b pb-1'>
        <h1>Name:</h1>
      <h1 className=''> {user?.displayName}</h1>
      </div>
      <div className='flex justify-between border-b pb-1'>
        <h1>Email:</h1>
      <h1 className=''> {user?.email}</h1>
      </div>
      <div className='flex justify-between border-b pb-1'>
        <h1>Trainer Name:</h1>
      <h1 className=''> {slot?.displayName}</h1>
      </div>
      <div className='flex justify-between border-b pb-1'>
        <h1>Slot Name:</h1>
        <h1>{slot?.slotName}</h1>
      </div>
      <div className='flex justify-between border-b pb-1'>
        <h1>Package:</h1>
        <h1>{type==='basic'? 'Basic': type===''}</h1>
      </div>
      <div className='flex justify-between border-b pb-1'>
        <h1>Price:</h1>
        <h1>Price: {price}$</h1>
      </div>
      </div>

    <h1 className='mt-5 font-semibold'>Give us your card number</h1>
    <CardElement
    className='mt-4'
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
    <button type="submit" className='btn mt-5 w-full bg-bgCommon text-white' disabled={!stripe || !clientSecret}>
      Pay Now
    </button>
  </form>
 {cardError &&<p className='text-error mt-3'>{cardError}</p>}
  {transactionId && <div className='flex items-center flex-col mt-4'>
    <span className='font-bold'>Transaction Id</span>
    <p className='text-success text-center overflow-auto'>{transactionId}</p>
    </div>}
      </div>
       </div>
)
}

export default CheckOutForm;