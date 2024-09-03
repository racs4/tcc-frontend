import Button from "../../components/button/Button";

export default function Instructions({ whenAdvance }) {
  return (
    <div
      className="w-screen flex justify-center items-center flex-col"
      style={{ height: "max(100vh, 700px)" }}
    >
      <h1 className="text-2xl">Instruções</h1>
      <section className="my-5">
        <p>
          1. Este é um teste para encontrar o limite de diferenciação da sua percpeção de cores
        </p>
        <p>
          2. Oito imagens de calibração será mostrada à você. Cada uma delas tera várias bolinhas que formam um círculo.
        </p>
        <p>3. Este círculo, no entanto, contêm uma parte faltando.</p>
        <p>4. Sua tarefa será dizer em qual direção está faltando essa parte. </p>
        <p>5. Com isso se é encontrado o limite de diferenciação da sua percpeção de cores.</p>
        <p>6. Um algoritmo então irá recolorir, se necessário, algumas imagens baseadas na sua percepção.</p>
      </section>
      <Button
        onClick={() => {
          whenAdvance();
        }}
      >
        Avançar
      </Button>
    </div>
  );
}
