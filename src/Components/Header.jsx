import { Link } from "react-router-dom";

export default function Header() {
  return (
    <section className="Header">
      <Link to="/">
        <img src="../favicon.ico" alt="reviewLogo" className="logo"></img>
      </Link>
    </section>
  );
}
