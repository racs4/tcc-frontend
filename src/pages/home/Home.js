import { Link } from "react-router-dom";
import Button from "../../components/button/Button.js";
function Home() {
  return (
    <>
      <main className="flex flex-col justify-center items-center h-64 min-h-screen font-mono">
        <div className="text-4xl mb-5">Web Icd</div>
        <Link to="/icd">
          <Button>Fazer Teste</Button>
        </Link>
      </main>
    </>
  );
}

export default Home;
