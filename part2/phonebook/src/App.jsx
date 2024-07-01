import { useState, useEffect } from "react";
import personService from "./server/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [message, setMessage] = useState({
    message: null,
    messageColor: "green",
  });

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const handleMessage = (msg, msgColor = "green", time = 1500) => {
    setMessage({
      message: msg,
      messageColor: msgColor,
    });
    setTimeout(
      () =>
        setMessage({
          message: null,
          messageColor: msgColor,
        }),
      time
    );
  };

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
        personService
          .update(existingPerson.id, updatedPerson)
          .then((person) =>
            // update returns the object containing the updated person info
            setPersons(
              // recreate persons, but replace the person being updated with their updated info
              persons.map((p) => (p.id === existingPerson.id ? person : p))
            )
          )
          .catch((err) => {
            handleMessage(
              `Information of ${existingPerson.name} has already been removed from server`,
              "red"
            );
          });

        handleMessage(`Updated ${existingPerson.name}!`);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((person) => setPersons(persons.concat(person)));

      handleMessage(`Added ${newName}!`);
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
      <Notification
        message={message.message}
        messageColor={message.messageColor}
      />
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
