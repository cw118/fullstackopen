import Country from "./Country";

const Countries = ({ countries, setCountries }) => {
  if (!countries || countries.length === 0) {
    return <p>No results found...</p>;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1) {
    return countries.map((match) => (
      <p key={match.name.common}>
        {match.name.common}{" "}
        <button onClick={() => setCountries([match])}>show</button>
      </p>
    ));
  } else if (countries.length === 1) {
    const { name, capital, area, flags, languages, capitalInfo } = countries[0];
    const latlng = capitalInfo.latlng;

    return (
      <Country
        name={name}
        capital={capital}
        area={area}
        flags={flags}
        languages={languages}
        latlng={latlng}
      />
    );
  }
};

export default Countries;
