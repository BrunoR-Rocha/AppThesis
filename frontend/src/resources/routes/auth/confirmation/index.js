import React from 'react';
import { useLocation } from 'react-router-dom';

const EmailConfirmation = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get('status');

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md text-center">
        {status === 'success' && (
          <>
            <h1 className="text-2xl font-semibold mb-4">Email Verified Successfully!</h1>
            <p className="text-gray-700">Your email has been verified. You can now log in.</p>
            <a href="/login" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
              Go to Login
            </a>
          </>
        )}

        {status === 'already_verified' && (
          <>
            <h1 className="text-2xl font-semibold mb-4">Email Already Verified</h1>
            <p className="text-gray-700">Your email has already been verified. You can log in.</p>
            <a href="/login" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
              Go to Login
            </a>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="text-2xl font-semibold mb-4">There was an error!</h1>
            <p className="text-gray-700">Please try again to verify you account. If the error persists please contact the support team. Thank you</p>
            <a href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
              Go to Main Page
            </a>
          </>
        )}

        {!status && (
          <>
            <h1 className="text-2xl font-semibold mb-4">Please Confirm Your Email</h1>
            <p className="text-gray-700">
              We have sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;
