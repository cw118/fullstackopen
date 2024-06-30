const Filter = ({ dataFilter, onChange }) => {
  return (
    <div>
      filter shown with <input value={dataFilter} onChange={onChange} />
    </div>
  );
};

export default Filter;
