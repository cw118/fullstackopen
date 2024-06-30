import Person from "./Person";

const Persons = ({ persons, del }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          del={del}
        />
      ))}
    </div>
  );
};

export default Persons;
