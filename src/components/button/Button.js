/**
 * @name Button
 *
 * @description
 * Button component is a reusable component that can be used to create buttons in the application.
 *
 * @param {Object} params - The parameters of the button component.
 * @param {string} params.children - The content of the button.
 */
function Button({ children, ...params }) {
  return (
    <button
      {...params}
      className={`border-2  px-5 py-1 hover:bg-slate-900 rounded-md ${
        params.disabled
          ? "border-slate-800 text-slate-500 cursor-default"
          : "border-white cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
