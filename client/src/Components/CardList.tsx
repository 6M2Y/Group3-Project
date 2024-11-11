import React from 'react';

type Card = {
  title: string;
  description: string;
  author: string;
  created: string;
  updated: string;
};

type CardListProps = {
  cards: Card[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

const CardList: React.FC<CardListProps> = ({ cards, onEdit, onDelete }) => {
  return (
    <div className="card-list">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <p><strong>Author:</strong> {card.author}</p>
          <p><strong>Created:</strong> {card.created}</p>
          <p><strong>Updated:</strong> {card.updated}</p>
          <button onClick={() => onEdit(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CardList;
