export default function CardForm({
  values,
  onChange,
  onSubmit,
  busy,
  error,
  submitText,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }
  /* TODO: Complete the CardForm component 
  - display form inputs for card_name and card_pic
  - display error message
  - display submit button 
  - handle form submission 
  - style as a form UI */

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div>
        <label>Card Name</label>
        <input
          type="text"
          name="card_name"
          value={values.card_name}
          onChange={onChange}
        />
      </div>

      <div>
        <label>Card Image URL</label>
        <input
          type="text"
          name="card_pic"
          value={values.card_pic}
          onChange={onChange}
        />
      </div>

      <button disabled={busy}>
        {busy ? "Saving..." : submitText}
      </button>
    </form>
  );
}