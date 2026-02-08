import { useAuth0 } from '@auth0/auth0-react';
import React,{useEffect} from 'react';

/**
 * TODO: Ticket 3:
 * Implement authentication and logging functionality using Auth0
 */
export const LoggingButtons = () => {
  const { isAuthenticated, loginWithRedirect, logout,error } = useAuth0();
  useEffect(() => {
  if (error) {
    console.error("Auth0 Error Details:", error.message);
  }
}, [error]);

  const buttonText = isAuthenticated ? 'Log Out' : 'Log In';

  const handleLogging = () => {
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <button className='nav-btn  px-4 py-1' onClick={handleLogging}>
      {buttonText}
    </button>
  );
};