const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, curr) => accumulator + curr.exercises,
    0 // initial value
  );
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  const { id, name, parts } = course;

  return (
    <>
      <Header text={name} />
      <Content parts={parts} />
    </>
  );
};

export default Course;
