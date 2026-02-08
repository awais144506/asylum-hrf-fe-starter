# Auth0 React Authentication Setup Guide

This guide will walk you through setting up Auth0 authentication in your React Single Page Application (SPA).

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A React application (Create React App or similar)
- An Auth0 account (free tier available at [auth0.com](https://auth0.com))

## 1. Set Up Auth0 Application

1. Log in to your Auth0 dashboard
2. Go to Applications > Create Application
3. Select "Single Page Application"
4. Go to Settings and note down:
   - Domain
   - Client ID
   - Allowed Callback URLs (add `http://localhost:5173`)
   - Allowed Logout URLs (add `http://localhost:5173`)
   - Allowed Web Origins (add `http://localhost:5173`)

## 2. Install Dependencies

```bash
npm install @auth0/auth0-react
# or
yarn add @auth0/auth0-react
```

## 3. Configure Auth0 Provider

Create a new file `src/auth/auth0-provider-with-config.js`:

```jsx
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export const Auth0ProviderWithConfig = ({ children }) => {
  const navigate = useNavigate();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
```

## 4. Set Up Environment Variables

Create a `.env` file in your project root:

```plaintext
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
```

## 5. Wrap Your App with Auth0Provider

Update your `src/index.js` or `src/App.js`:

```jsx
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithConfig } from './auth/auth0-provider-with-config';

function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithConfig>
        {/* Your app components */}
      </Auth0ProviderWithConfig>
    </BrowserRouter>
  );
}
```

## 6. Add Authentication Hooks

Example usage in a component:

```jsx
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return !isAuthenticated && (
    <button onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
}

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
}

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

## 7. Protect Routes

Create a protected route wrapper:

```jsx
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};
```

Usage in your routes:

```jsx
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route 
        path="/protected" 
        element={
          <ProtectedRoute>
            <ProtectedPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

## Environment Setup

For production deployment, make sure to:

1. Update the Auth0 application settings with your production URLs
2. Configure appropriate environment variables for each environment
3. Set up proper error handling and loading states
4. Implement proper security headers and CSP policies

## Common Issues and Troubleshooting

1. **Callback URL Errors**: Ensure all callback URLs are properly configured in Auth0 dashboard
2. **Token Errors**: Check if the scope includes all required permissions
3. **CORS Issues**: Verify the allowed origins in Auth0 settings
4. **Route Protection**: Ensure protected routes are properly wrapped with authentication checks

## Additional Resources

- [Auth0 React SDK Documentation](https://auth0.com/docs/libraries/auth0-react)
- [Auth0 React Samples](https://github.com/auth0-samples/auth0-react-samples)
- [React Router Documentation](https://reactrouter.com/)

## Support

For issues and questions:
- Check the [Auth0 Community](https://community.auth0.com/)
- Review [Auth0 Documentation](https://auth0.com/docs/)
- Contact Auth0 Support through your dashboard
