function Button({ children }) {
  return (
    <button className="border-2 border-black px-5 py-1 hover:bg-slate-100 rounded-md">
      {children}
    </button>
  );
}

export default Button;
