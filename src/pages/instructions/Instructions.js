import Button from "../../components/button/Button";

export default function Instructions({ whenAdvance }) {
  return (
    <div
      className="w-screen flex justify-center items-center flex-col"
      style={{ height: "max(100vh, 700px)" }}
    >
      <h1 className="text-2xl">Instructions</h1>
      <section className="my-5">
        <p>
          1. Hello, this is a test to find the differentiation limits of your color
          perception.
        </p>
        <p>
          2. Eight screens will be shown to you. Each of them will have several
          balls forming a circle.
        </p>
        <p>3. This circle, however, will have one of its parts missing.</p>
        <p>4. Your task will be to tell which direction this missing part is.</p>
      </section>
      <Button
        onClick={() => {
          whenAdvance();
        }}
      >
        Advance
      </Button>
    </div>
  );
}
