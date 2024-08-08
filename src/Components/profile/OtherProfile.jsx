import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../client';

const OtherProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();

    // Disable scrolling when this component is mounted

  }, [userId]);

  if (!profile) {
    return <div className="container mx-auto p-6">Profile not found</div>;
  }

  let profile_picture;

  if (profile.profile_picture) {
    profile_picture = profile.profile_picture;
  } else {
    profile_picture = '/images/user.png';
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg_utama p-6 overflow-hidden">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-3/4 mx-auto">
        <div className="pb-6 p-4 rounded-lg">
          <div className="flex justify-center mb-4">
            <img
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-300"
              src={profile_picture}
              alt="Profile"
            />
          </div>
          <div className="text-center">
            <div className="mb-2 font-bold">
              <h1 className="text-md break-words">{profile.name}</h1>
            </div>
            <div className="mb-2">
              <p className="text-md break-words">{profile.phone_number}</p>
            </div>
            <p className="text-md break-words">{profile.email}</p>
            <div className="mb-2"></div>
            <div className="mb-4">
              <p className="text-md break-words">{profile.address}</p>
            </div>
            <div className="flex flex-col justify-center items-center space-y-4">
              <button
                onClick={() => navigate(`/message?receiver=${profile.id}`)}
                className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-3.5 h-3.5 text-white me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
                Kirim Pesan
              </button>
              <button
                onClick={() => navigate(-1)}
                className="border border-blue-500 text-blue-500 py-2 px-4 rounded-lg"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
