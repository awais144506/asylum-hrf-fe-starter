import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const Auth0ProviderWithConfig = ({ children }) => {
  const navigate = useNavigate();
  
  const domain = import.meta.env.VITE_AUTH_DOMAIN?.trim().replace(
    /^https?:\/\//,
    ''
  );
  const clientId = import.meta.env.VITE_AUTH_CLIENT_ID?.trim();

  // Good practice: Add a check to ensure variables are loaded
  if (!domain || !clientId) {
    console.error(
      'Auth0: Missing VITE_AUTH_DOMAIN or VITE_AUTH_CLIENT_ID in .env'
    );
    return <>{children}</>;
  }

  const onRedirectCallback = appState => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};