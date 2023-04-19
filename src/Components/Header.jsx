import { Link } from "react-router-dom";
import DropdownMenus from "./DropdownMenus";
import CategoryButtons from "./CategoryButtons";

export default function Header(props) {
  const {
    createNestedArrays,
    reviews,
    pages,
    handleSelect,
    selected,
    sortBy,
    order,
    url,
    changeUrl,
    categories,
    collapsed,
    category,
  } = props;
  return (
    <div className="stickyBanner">
      <section className={collapsed ? "Header collapsed" : "Header"}>
        <Link className="logoLink" to="/">
          <img
            src="../favicon.ico"
            alt="reviewLogo"
            className={collapsed ? "logo collapsed" : "logo"}></img>
        </Link>
        {!collapsed ? (
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
      <CategoryButtons
        url={url}
        changeUrl={changeUrl}
        categories={categories}
        category={category}
      />
    </div>
  );
}
