const Person = ({ id, name, number, del }) => {
  return (
    <p>
      {name} {number}
      <button onClick={() => del(id)}>delete</button>
    </p>
  );
};

export default Person;
