function Button({ children, ...params }) {
  return (
    <button
      {...params}
      className={`border-2  px-5 py-1 hover:bg-slate-100 rounded-md ${
        params.disabled
          ? "border-slate-200 text-slate-200 cursor-default"
          : "border-black cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
