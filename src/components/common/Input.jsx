const Input = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-white/10 dark:bg-gray-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default Input;