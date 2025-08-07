const ProductFilters = ({ data, setFilter, filterProduct }) => {
  return (
    <div className="buttons text-center py-5">
      <button
        className="btn btn-outline-dark btn-sm m-2"
        onClick={() => setFilter(data)}
      >
        All
      </button>
      <button
        className="btn btn-outline-dark btn-sm m-2"
        onClick={() => filterProduct("men's clothing")}
      >
        Men's Clothing
      </button>
      <button
        className="btn btn-outline-dark btn-sm m-2"
        onClick={() => filterProduct("women's clothing")}
      >
        Women's Clothing
      </button>
      <button
        className="btn btn-outline-dark btn-sm m-2"
        onClick={() => filterProduct("jewelery")}
      >
        Jewelery
      </button>
      <button
        className="btn btn-outline-dark btn-sm m-2"
        onClick={() => filterProduct("electronics")}
      >
        Electronics
      </button>
    </div>
  );
};

export default ProductFilters; 