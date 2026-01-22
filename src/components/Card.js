import { useNavigate } from "react-router-dom";

  /* TODO: Complete the Card component
    - display the card image and name
    - display the card ID
    - edit button linking to edit page
    - delete button calling onDelete with the card object
    - style as a card UI */

export default function Card({ card, onDelete, busy }) {
  const navigate = useNavigate();

  function handleEdit(e) {
    e.stopPropagation(); // prevent card click
    navigate(`/cards/${card.id}/edit`);
  }

  return (
    <div
      className="card"
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        backgroundColor: "#fff",
        cursor: "pointer",
      }}
      onClick={() => navigate(`/cards/${card.id}/edit`)}
    >
      <img
        src={card.card_pic}
        alt={card.card_name}
        style={{ width: "100%", borderRadius: "6px" }}
      />

      <h3>{card.card_name}</h3>
      <p>ID: {card.id}</p>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={handleEdit}>
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation(); // 👈 critical
            onDelete();
          }}
          disabled={busy}
        >
          {busy ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

