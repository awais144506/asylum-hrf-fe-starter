import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className='flex flex-col items-center justify-center p-8 secondary-c'>
        <img
          src={user.picture}
          alt={user.name}
          className='rounded-full w-32 h-32 mb-4 border-4 border-white shadow-lg'
        />
        <h2 className='text-2xl font-bold mb-2'>{user.name}</h2>
        <p className='text-gray-600 mb-4'>{user.email}</p>
        <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
          <h3 className='text-lg font-semibold mb-3 border-b pb-2'>
            User Information
          </h3>
          <div className='space-y-2 text-left'>
            <p>
              <span className='font-medium'>Nickname:</span> {user.nickname}
            </p>
            <p>
              <span className='font-medium'>Updated at:</span>{' '}
              {new Date(user.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
