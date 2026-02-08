import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const Auth0ProviderWithConfig = ({ children }) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;

  // Cleanup domain and clientId to handle common .env mistakes
  const formattedDomain = domain
    ?.trim()
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');
  const formattedClientId = clientId?.trim();

  // Good practice: Add a check to ensure variables are loaded and not placeholders
  if (
    !formattedDomain ||
    !formattedClientId ||
    formattedDomain.includes('your-domain') ||
    formattedClientId.includes('your-client-id')
  ) {
    console.error(
      'Auth0 Error: Missing or invalid VITE_AUTH_DOMAIN or VITE_AUTH_CLIENT_ID in .env'
    );
    return <>{children}</>;
  }

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={formattedDomain}
      clientId={formattedClientId}
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