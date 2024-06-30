const PersonForm = ({
  name,
  onNameChange,
  number,
  onNumberChange,
  submit,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={name} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={number} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">{submit}</button>
      </div>
    </form>
  );
};

export default PersonForm;
