import { Link } from "react-router-dom";
export default function CategoryButtons({ categories, url, changeUrl }) {
  return (
    <div className="categoryButtons">
      {categories.map((category) => {
        return (
          <Link
            to={url}
            id={category.slug}
            onMouseOver={changeUrl}
            onClickCapture={changeUrl}>
            <button id={category.slug}>{category.slug}</button>
          </Link>
        );
      })}
    </div>
  );
}
