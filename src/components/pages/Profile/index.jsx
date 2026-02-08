import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className='text-center p-4'>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className='flex flex-col items-center gap-4 p-8'>
        <img
          src={user.picture}
          alt={user.name}
          className='rounded-full w-32 h-32'
        />
        <h2 className='text-2xl font-bold'>{user.name}</h2>
        <p className='text-lg'>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
