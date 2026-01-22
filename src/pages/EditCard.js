import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";


export default function EditCard() {
  /* TODO: Complete the EditCard page
    - display a form for editing a card (use the CardForm component to display the form)
    - handle form submission to call updateCard API
    - handle loading, busy, and error states
    - style as a form UI */
    const { id } = useParams();
    const navigate = useNavigate();
    

    const [card, setCard] = useState(null);
    const [values, setValues] = useState({
      card_name: "",
      card_pic: "",
    });
    const [loading, setLoading] = useState(true);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      async function loadCard() {
        try {
          setLoading(true);
          const cards = await getCards();
          const found = cards.find((c) => c.id === Number(id));

          if (!found) {
            throw new Error("Card not found");
          }

          setCard(found);
        } catch (err) {
          setError("Failed to load card.");
        } finally {
          setLoading(false);
       }
      }

      loadCard();
    }, [id]);

    useEffect(() => {
      if (card) {
        setValues({
          card_name: card.card_name,
          card_pic: card.card_pic,
        });
      }
    }, [card]);

    function handleChange(e) {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(updatedData) {
      try {
        setBusy(true);
        await updateCard(card.id, updatedData);
        navigate("/");
      } catch (err) {
        setError("Failed to update card.");
      } finally {
        setBusy(false);
      }
    }

    if (loading) { return <main>Loading card...</main>; }
    if (error) { return <main>{error}</main>; }

  return <main className="form-container">
      <h1>Edit Card</h1>
      <CardForm
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        busy={busy}
        error={error}
        submitText="Update Card"
      />
  </main>;
}
