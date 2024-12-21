import { useSearchParams } from "react-router-dom";
import { data } from "./data";
import { useState } from "react";

function FilterAndSort() {
  const [rows, setRows] = useState(data);
  const [searchParams, setSearchParams] = useSearchParams();

  // NOTE: filter function
  function handleFilter(filter) {
    searchParams.set("discount", filter);
    setSearchParams(searchParams);
    return null;
  }

  // NOTE: getting filter value and manipulating the rows
  const filterValue = searchParams.get("discount") || "all";
  let filterRows;
  if (filterValue === "all") {
    filterRows = rows;
  } else if (filterValue === "with-discount") {
    filterRows = rows.filter((row) => row.discount);
  } else if (filterValue === "no-discount") {
    filterRows = rows.filter((row) => !row.discount);
  }

  // NOTE: sorting function
  const [sort, setSort] = useState("capacityAsc");

  function handleSort(sort) {
    searchParams.set("sort", sort);
    setSearchParams(searchParams);
  }

  const sortValue = searchParams.get("sort") || "capacityAsc";

  let sortedRows;

  if (sortValue === "capacityAsc") {
    sortedRows = filterRows;
  } else if (sortValue === "capacityDesc") {
    sortedRows = filterRows.sort((a, b) => b.capacity - a.capacity);
  } else if (sortValue === "priceAsc") {
    sortedRows = filterRows.sort((a, b) => a.price - b.price);
  } else if (sortValue === "priceDesc") {
    sortedRows = filterRows.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <h1>Filter / Sort</h1>

      {/* NOTE: FILTER */}
      <div>
        <button
          onClick={() => handleFilter("all")}
          style={
            filterValue === "all"
              ? { backgroundColor: "cyan", cursor: "not-allowed" }
              : {}
          }
        >
          All
        </button>
        <button
          onClick={() => handleFilter("with-discount")}
          style={
            filterValue === "with-discount"
              ? { backgroundColor: "cyan", cursor: "not-allowed" }
              : {}
          }
        >
          With Discount
        </button>
        <button
          onClick={() => handleFilter("no-discount")}
          style={
            filterValue === "no-discount"
              ? { backgroundColor: "cyan", cursor: "not-allowed" }
              : {}
          }
        >
          No discount
        </button>
      </div>

      {/* NOTE: SORT */}
      <div>
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="capacityAsc">Sort by capacity (asc)</option>
          <option value="capacityDesc">Sort by capacity (desc)</option>
          <option value="priceAsc">Sort by price (asc)</option>
          <option value="priceDesc">Sort by price (desc)</option>
        </select>
      </div>

      <div className="grid heading-row margin-lg">
        <div>No.</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      </div>

      {sortedRows.map((data) => (
        <div className="grid row" key={data.cabinNo}>
          <div>{data.cabinNo}</div>
          <div>Fills up to {data.capacity} people</div>
          <div>${data.price}</div>
          <div>${data.discount || "-"}</div>
        </div>
      ))}
    </div>
  );
}

export default FilterAndSort;
