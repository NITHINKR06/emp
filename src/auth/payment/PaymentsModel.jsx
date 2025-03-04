import React, { useState, useEffect, useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';
import QRCode from 'qrcode';
import '../../Css/PaymentsModel.css';

function PaymentsModel() {
  const [amount, setAmount] = useState('00.00');
  const surcharge = 9.99; // Surcharge amount in rupees
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const upiId = 'your-upi-id@upi'; // Replace with your actual UPI ID

  // Calculate the total amount (entered amount plus surcharge)
  const getTotalAmount = useCallback(() => {
    const enteredAmount = parseFloat(amount) || 0;
    return (enteredAmount + surcharge).toFixed(2);
  }, [amount]);

  // Generate a UPI payment URL and then convert it to a QR code
  const generateQrCode = useCallback(async () => {
    const totalAmount = getTotalAmount();
    const upiUrl = `upi://pay?pa=${upiId}&pn=Your+Business+Name&am=${totalAmount}&cu=INR`;
    try {
      const qrCode = await QRCode.toDataURL(upiUrl);
      setQrCodeUrl(qrCode);
    } catch (error) {
      console.error('QR Code Generation Error:', error);
    }
  }, [getTotalAmount, upiId]);

  // Generate the QR code on component mount or whenever the amount changes
  useEffect(() => {
    generateQrCode();
  }, [generateQrCode]);

  // Handle form submission for card payment
  const handlePayment = (e) => {
    e.preventDefault();
    alert(`Payment of ₹${getTotalAmount()} Successful! Thank you for your purchase.`);
  };

  return (
    <div className="payments-model">
      <div className="payments-container">
        {/* Left Panel: Payment Details & UPI QR Code */}
        <div className="left-panel">
          <h1 className="title">Payment Portal</h1>
          <div className="input-group">
            <label htmlFor="amount">Enter Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 50.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="total-display">
            <h2>
              Total: <span className="total-amount">₹{getTotalAmount()}</span>
            </h2>
            <p>(Includes ₹{surcharge} surcharge)</p>
          </div>
          <div className="qr-section">
            <h2>UPI QR Code</h2>
            {qrCodeUrl ? (
              <img src={qrCodeUrl} alt="UPI QR Code" width={160} height={160} />
            ) : (
              <p>Generating QR Code...</p>
            )}
            <p>Scan with your UPI app to pay</p>
            <button
              className="google-pay-button"
              onClick={() => alert('Redirecting to Google Pay...')}
            >
              <FcGoogle className="google-icon" />
              Pay with Google
            </button>
          </div>
        </div>

        {/* Right Panel: Card Payment Form */}
        <div className="right-panel">
          <form onSubmit={handlePayment} className="card-form">
            <h2>Card Payment</h2>
            <div className="form-group">
              <label htmlFor="name">Cardholder Name</label>
              <input id="name" type="text" placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="card-number">Card Number</label>
              <input id="card-number" type="text" placeholder="1234 5678 9012 3456" required />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="expiry">Expiry Date</label>
                <input id="expiry" type="text" placeholder="MM/YY" required />
              </div>
              <div className="form-group half">
                <label htmlFor="cvv">CVV</label>
                <input id="cvv" type="password" placeholder="123" required />
              </div>
            </div>
            <button type="submit" className="pay-now-button">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentsModel;
