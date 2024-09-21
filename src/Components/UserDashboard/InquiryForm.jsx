import React, { useState } from 'react';

const InquiryForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("We'll get back to you soon"); // Alert message
        setEmail('');
        setMessage('');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form 
                onSubmit={handleSubmit} 
                className="bg-light p-4 rounded shadow" 
                style={{ width: '400px' }}
            >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message:</label>
                    <textarea
                        id="message"
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe your mental health issue..."
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send Inquiry</button>
            </form>
        </div>
    );
};

export default InquiryForm;
