import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <Link to="/paginate">Go to pagination</Link>
      </div>
      <div>
        <Link to="/filter">Go to filter</Link>
      </div>
    </div>
  );
}

export default Home;
