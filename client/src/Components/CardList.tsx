import React, { useEffect, useState } from 'react';

type Card = {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

type CardListProps = {
  cards: Card[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const CardList: React.FC<CardListProps> = ({ cards, onEdit, onDelete }) => {
  return (
    <div>
      {cards.map((card, index) => (
        <div key={index}>
          <h2>Post Title: {card.title}</h2>
          <p>{card.content}</p>
          <p>Author: {card.author}</p>
          <p>Created: {new Date(card.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(card.updatedAt).toLocaleString()}</p>
          <button onClick={() => onEdit(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/posts')
      .then((response) => response.json())
      .then((data) => {console.log('Fetched data:', data); // Log the fetched data 
        const formattedData = data.map((item: any) => ({
          
          title: item.title,
          content: item.content,
          author: item.versions[0].editor, // Assuming the author is stored in the first version's editor field
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          
        }));
      setCards(data)
    })
      .catch((error) => console.error('Error fetching cards:', error));
  }, []);

  const handleEdit = (index: number) => {
    console.log('Edit card at index:', index);
    // Implement edit functionality here
  };

  const handleDelete = (index: number) => {
    console.log('Delete card at index:', index);
    // Implement delete functionality here
  };

  return (
    <div>
      <CardList cards={cards} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;