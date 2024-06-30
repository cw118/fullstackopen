import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((res) => {
      console.log("promise fulfilled");
      setPersons(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(newPerson)); // avoid mutating state directly by using `concat`!
    }

    setNewName("");
    setNewNumber("");
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
      />
    </div>
  );
};

export default App;
