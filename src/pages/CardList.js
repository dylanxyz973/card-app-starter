import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  /* TODO: Complete the CardList page
    - display a list of cards (use the Card component to display each card)
    - delete button calling handleDelete with the card object
    - handle loading, busy, and error states
    - style as a grid UI */

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);   
    const [busyId, setBusyId] = useState(null); 
    const [error, setError] = useState(null);         

    useEffect(() => {
      async function fetchCards() {
        try {
          const data = await getCards();
          setCards(data);
        } catch (err) {
          setError("Failed to load cards.");
        } finally {
          setLoading(false);
        }
      }

      fetchCards();
    }, []);

    async function handleDelete(card) {
      try {
        setBusyId(card.id);
        await deleteCard(card.id);
        setCards((prev) => prev.filter((c) => c.id !== card.id));
      } catch (err) {
        setError("Failed to delete card.");
      } finally {
        setBusyId(null);
      }
    }

    if (loading) {
      return <main>Loading cards...</main>;
    }

    if (error) {
      return <main>{error}</main>;
    }

  return <main className="card-grid">
    {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDelete={() => handleDelete(card)}
          disabled={busyId === card.id}
        />
      ))}
  </main>;
}
