import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./server/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = {
          name: existingPerson.name,
          number: newNumber,
        };
        personService.update(existingPerson.id, updatedPerson).then((person) =>
          // update returns the object containing the updated person info
          setPersons(
            // recreate persons, but replace the person being updated with their updated info
            persons.map((p) => (p.id === existingPerson.id ? person : p))
          )
        );
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((person) => setPersons(persons.concat(person)));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    if (confirm(`Delete ${persons.find((person) => person.id === id).name}?`)) {
      personService.deletePerson(id); // delete returns no data
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        dataFilter={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        number={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
        submit="add"
        onSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <Persons
        persons={
          nameFilter
            ? persons.filter((person) =>
                person.name.toLowerCase().includes(nameFilter)
              )
            : persons
        }
        del={handleDelete}
      />
    </div>
  );
};

export default App;
