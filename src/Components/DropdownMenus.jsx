export default function DropdownMenus({
  createNestedArrays,
  reviews,
  pages,
  handleSelect,
  selected,
  sortBy,
  order,
}) {
  return (
    <section className="dropdown">
      <select id="select" onChange={handleSelect} value={selected}>
        {createNestedArrays(reviews, pages).map((arr, index) => {
          return (
            <option value={index} key={index} id={index}>
              Page {index + 1}
            </option>
          );
        })}
      </select>
      <select id="sortBy" onChange={handleSelect} value={sortBy}>
        <option value="" disabled defaultValue="">
          Sort By
        </option>
        <option value="created_at">Date</option>
        <option value="title">Title</option>
        <option value="owner">User</option>
        <option value="votes">Votes</option>
      </select>
      <select id="order" onChange={handleSelect} value={order}>
        <option value="" disabled defaultValue="">
          Order
        </option>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </section>
  );
}
