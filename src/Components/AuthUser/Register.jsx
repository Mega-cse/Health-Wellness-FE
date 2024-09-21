import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    age: Yup.number().required('Age is required').positive('Age must be a positive number'),
    height: Yup.number().required('Height is required').positive('Height must be a positive number'),
    weight: Yup.number().required('Weight is required').positive('Weight must be a positive number'),
    location: Yup.string().required('Location is required'),
    role: Yup.string().required('Role is required')
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const response = await fetch('https://health-wellness-be-3.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ success: true, message: 'User registered successfully!' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setStatus({ success: false, message: result.message || 'Something went wrong' });
      }
    } catch (err) {
      setStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20%', height: 'calc(100vh - 60px)', padding: '2rem' }}>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          age: '',
          height: '',
          weight: '',
          location: '',
          role: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '2rem', maxWidth: '500px', width: '100%' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Register</h1>
            <div>
              <label htmlFor="username">Username:</label>
              <Field 
                type="text" 
                id="username" 
                name="username" 
                autoComplete="username" // Added autocomplete attribute
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field 
                type="email" 
                id="email" 
                name="email" 
                autoComplete="email" // Added autocomplete attribute
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field 
                type="password" 
                id="password" 
                name="password" 
                autoComplete="new-password" // Added autocomplete attribute
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="age">Age:</label>
              <Field 
                type="number" 
                id="age" 
                name="age" 
                autoComplete="age" // Added autocomplete attribute (non-standard, but included)
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <ErrorMessage name="age" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="height">Height:</label>
              <Field 
                type="number" 
                id="height" 
                name="height" 
                autoComplete="height" // Added autocomplete attribute (non-standard, but included)
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <ErrorMessage name="height" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="weight">Weight:</label>
              <Field 
                type="number" 
                id="weight" 
                name="weight" 
                autoComplete="weight" // Added autocomplete attribute (non-standard, but included)
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <ErrorMessage name="weight" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <Field 
                type="text" 
                id="location" 
                name="location" 
                autoComplete="address" // Added autocomplete attribute
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <ErrorMessage name="location" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <Field 
                type="text" 
                id="role" 
                name="role" 
                autoComplete="role" // Added autocomplete attribute (non-standard, but included)
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }} 
              />
              <ErrorMessage name="role" component="div" style={{ color: 'red' }} />
            </div>
            <button
              type="submit"
              style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', transition: 'background-color 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              disabled={isSubmitting}
            >
              Register
            </button>
            {status && (
              <div style={{ color: status.success ? 'green' : 'red', textAlign: 'center', marginTop: '1rem' }}>
                {status.message}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
