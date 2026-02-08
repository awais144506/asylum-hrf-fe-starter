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
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  const handleLogging = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      loginWithRedirect();
    }
  };

  return (
    isAuthenticated && (
      <div className='flex flex-col items-center justify-center p-8 secondary-c'>
        <img
          src={user.picture}
          alt={user.name}
          className='rounded-full w-20 h-20 mb-4'
        />
        <h2 className='text-2xl font-bold mb-2'>{user.name}</h2>
        <p className='text-gray-600 mb-4'>{user.email}</p>
        <button className='bg-blue-500 p-3 text-white rounded-lg' onClick={handleLogging}>
          Logout
        </button>
      </div>
    )
  );
};

export default Profile;
