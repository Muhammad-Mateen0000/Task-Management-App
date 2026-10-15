const Label = ({ label }) => {
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-bold text-white"
      style={{
        backgroundColor: label.color,
      }}
    >
      {label.name}
    </span>
  );
};

export default Label;
