'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';
import MainLayout from '@/app/MainLayout';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Nahid Ferdous Priom',
    email: 'nahid.priom.06@gmail.com',
    phone: '+8801829130012',
    joined: 'Jan 15, 2024',
    jobTitle: 'CTO at Codlinker',
    company: 'Codlinker',
    location: 'Dhaka, Bangladesh',
    linkedin: 'https://linkedin.com/in/nahidpriom',
    avatarUrl:
      'https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser({ ...formData });
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center bg-orange-50 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative"
        >
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-60" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-60" />

          <div className="relative text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img
                src={user.avatarUrl}
                alt="User avatar"
                className="w-24 h-24 rounded-full border-4 border-orange shadow-sm object-cover"
              />
              <button
                onClick={() => alert('Avatar update coming soon')}
                className="absolute bottom-0 right-0 bg-orange p-1.5 rounded-full shadow-md hover:bg-[#E06C1E] transition"
              >
                <Pencil size={16} color="white" />
              </button>
            </div>

            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-2xl font-semibold text-center text-gray-800 w-full bg-gray-50 border rounded-md py-1 px-2 mt-2"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            )}
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">Joined on {user.joined}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ProfileField
              label="Phone"
              name="phone"
              value={formData.phone}
              editing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              editing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Company"
              name="company"
              value={formData.company}
              editing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Location"
              name="location"
              value={formData.location}
              editing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              editing={isEditing}
              onChange={handleChange}
              isLink
            />
          </div>

          <div className="mt-6 text-center space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-orange text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-[#E06C1E] transition-all"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setFormData(user);
                    setIsEditing(false);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium shadow hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-orange text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-[#E06C1E] transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}


function ProfileField({ label, name, value, editing, onChange, isLink }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-sm text-gray-500">{label}</h3>
      {editing ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-white text-gray-800 font-medium border rounded px-2 py-1"
        />
      ) : isLink && value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-800 font-medium">{value || '—'}</p>
      )}
    </div>
  );
}
