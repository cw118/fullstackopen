import { useState } from "react";

const StatisticLine = ({ label, stat }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{stat}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    const all = good + neutral + bad;

    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine label="good" stat={good} />
            <StatisticLine label="neutral" stat={neutral} />
            <StatisticLine label="bad" stat={bad} />
            <StatisticLine label="all" stat={all} />
            <StatisticLine label="average" stat={(good - bad) / all} />
            <StatisticLine label="positive" stat={(100 * good) / all} />
          </tbody>
        </table>
      </>
    );
  } else {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood((n) => n + 1)} text="good" />
      <Button handleClick={() => setNeutral((n) => n + 1)} text="neutral" />
      <Button handleClick={() => setBad((n) => n + 1)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
