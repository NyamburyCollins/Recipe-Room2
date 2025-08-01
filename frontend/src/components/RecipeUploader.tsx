'use client';

import React, { useState } from 'react';
import axios from 'axios';
import type { ChangeEvent, FormEvent } from 'react';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dhtz1yi5y/image/upload';
const UPLOAD_PRESET = 'ml_default'; // Replace with your actual unsigned preset if different

const RecipeUploader: React.FC = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    setLoading(true);
    setSuccess('');
    setImageUrl('');

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      setImageUrl(res.data.secure_url);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      alert('Please enter a title and upload an image.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/recipes', {
        title,
        image_url: imageUrl,
      });
      console.log('Recipe saved:', res.data);
      setSuccess('Recipe uploaded successfully!');
      setTitle('');
      setImageUrl('');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save recipe. Try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto space-y-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-semibold text-gray-800">Upload a Recipe</h2>

      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full"
      />

      {loading && <p className="text-blue-500">Uploading image...</p>}

      {imageUrl && (
        <div className="mt-2">
          <img src={imageUrl} alt="Preview" className="w-full max-h-64 object-cover rounded" />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Save Recipe
      </button>

      {success && <p className="text-green-600 font-medium">{success}</p>}
    </form>
  );
};

export default RecipeUploader;