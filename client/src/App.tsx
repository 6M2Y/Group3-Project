import React from 'react';
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { Signup } from "./pages/Signup";
import Footer from './Components/Footer';
import CreateCard from './Components/CreateCard';
import CardList from './Components/CardList';

type Card = {
  title: string;
  description: string;
  author: string;
  created: string;
  updated: string;
};

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddCard = (newCard: Card) => {
    if (editIndex !== null) {
      // Update existing card
      const updatedCards = [...cards];
      updatedCards[editIndex] = newCard;
      setCards(updatedCards);
      setEditIndex(null); // Clear edit mode
    } else {
      // Add new card
      setCards([...cards, newCard]);
    }
  };

  const handleEditCard = (index: number) => {
    setEditIndex(index);
  };

  const handleDeleteCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={
              <CardList 
                cards={cards} 
                onEdit={handleEditCard} 
                onDelete={handleDeleteCard} 
              />
            } 
          />
          <Route 
            path="/createpost" 
            element={
              <CreateCard 
                onAddCard={handleAddCard} 
                initialData={editIndex !== null ? cards[editIndex] : null} 
              />
            } 
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
