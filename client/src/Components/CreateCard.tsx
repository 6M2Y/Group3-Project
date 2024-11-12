import React, { useState, useEffect } from 'react';

type Card = {
  title: string;
  description: string;
  author: string;
  created: string;
  updated: string;
};

type CreateCardProps = {
  onAddCard: (card: Card) => void;
  initialData?: Card | null;
};

const CreateCard: React.FC<CreateCardProps> = ({ onAddCard, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setAuthor(initialData.author);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: Card = {
      title,
      description,
      author,
      created: initialData ? initialData.created : new Date().toLocaleString(),
      updated: new Date().toLocaleString(),
    };
    onAddCard(newCard);
    setTitle('');
    setDescription('');
    setAuthor('');
  };

  return (
    <div>
      <h2>{initialData ? 'Edit Card' : 'Create a New Wiki Card'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">{initialData ? 'Update Card' : 'Create Card'}</button>
      </form>
    </div>
  );
};

export default CreateCard;
