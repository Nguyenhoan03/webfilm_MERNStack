import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VnpayReturn = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await axios.get(`/payment/vnpay-return${location.search}`);
        setPaymentStatus(response.data.message);
      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus('Payment verification failed');
      }
    };

    fetchPaymentStatus();
  }, [location.search]);

  return (
    <div className="payment-status">
      <h2>Payment Status</h2>
      {paymentStatus ? <p>{paymentStatus}</p> : <p>Verifying payment...</p>}
    </div>
  );
};

export default VnpayReturn;