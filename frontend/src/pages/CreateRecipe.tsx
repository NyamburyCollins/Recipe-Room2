import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const CreateRecipe: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('You must be logged in to create a recipe.');
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      title,
      description,
      videoUrl,
      createdBy: currentUser.email,
      comments: [],
      favoritedBy: [],
    };

    const existingRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const updatedRecipes = [...existingRecipes, newRecipe];

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    navigate('/profile');
  };

  return (
    <Container className="mt-4">
      <h2>Create Recipe</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipeTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="recipeDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter recipe description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="recipeVideo" className="mb-3">
          <Form.Label>YouTube Video URL (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Recipe
        </Button>
      </Form>
    </Container>
  );
};

export default CreateRecipe;