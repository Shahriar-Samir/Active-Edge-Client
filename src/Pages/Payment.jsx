import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Payment = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const [slotId,setSlotId] = useState(searchParams.get('slotId'))
    const [type,setType] = useState(searchParams.get('type'))

    return (
        <div>
            payment
            {slotId}
            {type}
        </div>
    );
};

export default Payment;