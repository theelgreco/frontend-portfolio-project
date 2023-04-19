import { Link } from "react-router-dom";
import DropdownMenus from "./DropdownMenus";

export default function Header(props) {
  console.log(props);
  const {
    createNestedArrays,
    reviews,
    pages,
    handleSelect,
    selected,
    sortBy,
    order,
  } = props;
  return (
    <section className="Header">
      <Link className="logoLink" to="/">
        <img src="../favicon.ico" alt="reviewLogo" className="logo"></img>
      </Link>
      {Object.keys(props).length ? (
        <DropdownMenus
          createNestedArrays={createNestedArrays}
          reviews={reviews}
          pages={pages}
          handleSelect={handleSelect}
          selected={selected}
          sortBy={sortBy}
          order={order}
        />
      ) : (
        <></>
      )}
    </section>
  );
}
