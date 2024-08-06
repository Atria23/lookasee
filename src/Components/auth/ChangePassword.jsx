import React, { useState, useEffect } from 'react';
import { supabase } from '../../client';
import ProfileNav from '../profile/ProfileNav'; // Pastikan path ini sesuai dengan struktur direktori

const ResetPasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setError('Tidak dapat mendapatkan sesi pengguna: ' + error.message);
      } else {
        setUser(data.session.user);
      }
    };

    getUserData();
  }, []);

  const handlePasswordReset = async () => {
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('Kata sandi baru tidak cocok.');
      return;
    }

    if (!user) {
      setError('Pengguna tidak terdeteksi.');
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        setError('Kata sandi saat ini salah.');
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        setError('Gagal memperbarui kata sandi: ' + updateError.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError('Kesalahan tidak terduga: ' + error.message);
    }
  };

  return (
    <div className="flex h-full overflow-hidden ">
      <ProfileNav />
      <div className="flex-1 p-2 ">
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold mb-2 ">Atur Sandi</h1>
          <div className="border border-black mb-8"></div>
          <div className="bg-blue-100 p-6 rounded-lg">
            <p className="mb-4 text-red-500">Kata sandi Anda harus paling tidak 6 karakter.</p>

            {/* Input Kata Sandi Saat Ini */}
            <div className="mb-4 ">
              <label htmlFor="currentPassword" className="block text-gray-700 font-bold">Kata Sandi Saat Ini</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Input Kata Sandi Baru */}
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700 font-bold">Kata Sandi Baru</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Input Konfirmasi Kata Sandi */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold">Konfirmasi Kata Sandi Baru</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              onClick={handlePasswordReset}
              className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Simpan Perubahan
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {success && <p className="text-green-500 mt-4">Kata sandi berhasil diperbarui!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
