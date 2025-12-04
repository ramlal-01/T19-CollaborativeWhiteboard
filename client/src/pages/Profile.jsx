import React, { useState } from "react";
import {
  User,
  Edit,
  Save,
  Key,
  LogOut,
  Trash2,
  Camera,
  Clipboard,
  LayoutGrid,
  Clock,
  Loader2
} from "lucide-react";

const Profile = () => {
  // ------------ BASIC STATE ONLY (NO FIREBASE) ------------
  const [isAuthReady] = useState(true); // Always ready (no firebase)

  const [displayName, setDisplayName] = useState("Guest User");
  const [profileEmail] = useState("guest@example.com");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://placehold.co/100x100/A5B4FC/ffffff?text=U"
  );

  const userId = "LOCAL-USER-12345"; // Mock userId (no firebase)

  // ------------ STUB ACTIONS (NO BACKEND YET) ------------
  const handleProfileSave = () => {
    alert("Profile updated (local only, no backend)");
  };

  const handlePasswordSave = () => {
    alert("Password change clicked (logic will be added later)");
  };

  const handleLogout = () => {
    alert("Logout clicked (no auth yet)");
  };

  const handleDelete = () => {
    alert("Delete account clicked (no backend)");
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarUrl(reader.result);
    reader.readAsDataURL(file);
  };

  // ------------ LOADING SCREEN (STATIC) ------------
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="mt-4 text-gray-600">Loading Profile...</p>
      </div>
    );
  }

  // ---------------------------------------------------------
  //                  PROFILE PAGE UI (NO FIREBASE)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-inter">
      <div className="w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-8">
          <h1 className="text-3xl font-extrabold flex items-center text-gray-800">
            <User className="mr-3 text-indigo-600" /> User Profile & Settings
          </h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md">
            Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT SECTION */}
          <div className="lg:col-span-8 space-y-8">

            {/* PERSONAL INFO */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold border-b pb-3 mb-6 flex items-center text-gray-800">
                <Edit className="mr-2 text-indigo-600" /> Personal Details
              </h2>

              {/* Avatar */}
              <div className="flex items-center space-x-6 pb-6 border-b">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-300">
                  <img src={avatarUrl} alt="Avatar" />
                  <label className="absolute inset-0 bg-black bg-opacity-40 text-white 
                    flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer">
                    <Camera className="w-6 h-6" />
                    <input type="file" className="hidden" onChange={handleAvatarUpload}/>
                  </label>
                </div>

                <div>
                  <p className="text-xl font-bold">{displayName}</p>
                  <p className="text-gray-500">{profileEmail}</p>
                  <p className="text-gray-400 text-sm mt-1">User ID: {userId}</p>
                </div>
              </div>

              {/* Name Input */}
              <div className="mt-6">
                <label className="block text-gray-700 mb-1">
                  Username / Display Name
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>

              <button
                onClick={handleProfileSave}
                className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 text-white shadow-md flex items-center"
              >
                <Save className="mr-2" /> Save Changes
              </button>
            </div>

            {/* CHANGE PASSWORD */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold border-b pb-3 mb-6 flex items-center text-gray-800">
                <Key className="mr-2 text-indigo-600" /> Change Password
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="password" placeholder="Current Password" className="border px-3 py-2 rounded-lg"/>
                <input type="password" placeholder="New Password" className="border px-3 py-2 rounded-lg"/>
                <input type="password" placeholder="Confirm Password" className="border px-3 py-2 rounded-lg"/>
              </div>

              <button
                onClick={handlePasswordSave}
                className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 text-white shadow-md"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:col-span-4 space-y-8">

            {/* STATS */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold border-b pb-3 mb-6 flex items-center text-gray-800">
                <Clipboard className="mr-2 text-indigo-600" /> Activity Stats
              </h2>
              <div className="p-4 bg-indigo-50 rounded-xl text-center shadow-md">
                <LayoutGrid className="mx-auto text-indigo-600 mb-2" />
                <span className="text-3xl font-bold text-indigo-800">0</span>
                <p className="text-gray-600">Total Boards Created</p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl text-center shadow-md mt-4">
                <Clock className="mx-auto text-indigo-600 mb-2" />
                <span className="text-xl font-bold text-indigo-800">N/A</span>
                <p className="text-gray-600">Last Active</p>
              </div>
            </div>

            {/* DANGER ZONE */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-red-200">
              <h2 className="text-2xl font-bold text-red-600 border-b pb-3 mb-6 flex items-center">
                <Trash2 className="mr-2" /> Danger Zone
              </h2>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow mb-4"
              >
                <LogOut className="mr-2 inline" /> Logout
              </button>

              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg shadow"
              >
                <Trash2 className="mr-2 inline" /> Delete Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
