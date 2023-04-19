import { Link } from "react-router-dom";

export default function CategoryButtons({
  categories,
  url,
  changeUrl,
  category,
}) {
  let categoryNames = [];
  categories.forEach((e) => {
    categoryNames.push(e.slug);
  });

  let cat = category;

  //stop scrolling window when mouse is on category menu
  document.addEventListener(
    "mousewheel",
    (e) => {
      if (categoryNames.includes(e.target.id)) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  function scroll(e) {
    const bar = e.target.parentElement.parentElement;

    if (e.deltaY > 0) {
      bar.scrollLeft += 20;
    } else {
      bar.scrollLeft -= 20;
    }
  }

  function handleMouseOver(e) {
    changeUrl(e);
  }

  function handleClick(e) {
    changeUrl(e);
  }

  return (
    <div className="categoryButtons" onScroll={scroll} onWheel={scroll}>
      {categories.map((category) => {
        return (
          <Link
            to={url}
            id={category.slug}
            key={category.slug}
            onMouseOver={handleMouseOver}
            onClickCapture={handleClick}>
            <button
              id={category.slug}
              className={category.slug === cat ? "selectedCategory" : ""}>
              {category.slug}
            </button>
          </Link>
        );
      })}
    </div>
  );
}
