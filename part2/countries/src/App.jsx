import { useState, useEffect } from "react";
import server from "./server";
import Countries from "./components/Countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (search) {
      server
        .getAll()
        .then((results) =>
          setCountries(
            results.filter((c) =>
              c.name.common.toLowerCase().includes(search.toLowerCase())
            )
          )
        );
    }
  }, [search]);

  return (
    <div>
      <p>
        find countries{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </p>
      <Countries countries={countries} setCountries={setCountries} />
    </div>
  );
}

export default App;
