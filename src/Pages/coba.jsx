import React, { useState } from 'react';
import { supabase } from '../client'; // Pastikan path ini benar

const UpdateEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdateEmail = async () => {
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      setError('Error fetching session');
      return;
    }

    const user = session?.session?.user;
    if (!user) {
      setError('User not logged in');
      return;
    }

    try {
      const response = await fetch('/api/updateEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          newEmail: email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Email updated successfully');
      } else {
        setError(`Error updating email: ${result.error}`);
      }
    } catch (error) {
      setError(`Error updating email: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Update Email</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter new email"
      />
      <button onClick={handleUpdateEmail}>Update Email</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default UpdateEmail;
