import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// NOTE: magic number that says how many elements must be present per page
const PAGE_SIZE = 5;

function PaginationComponent() {
  // NOTE: getting data
  const [posts, setPosts] = useState([]);
  let result = posts.slice(0, 35);

  // NOTE: count is the total number of results
  const count = result.length;

  // NOTE: setting the current page no. as a global URL state for convinience and reusability
  const [searchParams, setSearchParams] = useSearchParams();
  // FIXME: try using the || OR operator
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  // NOTE: 10 means we need 10 items to be on one page -> count = total page / 10 , 10 is the magic number
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // NOTE: create nextPage and prevPage event handlers
  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }
  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  useEffect(function () {
    async function fetchData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    }
    fetchData();
  }, []);

  if (currentPage) {
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;

    result = result.slice(from, to);
  }

  // NOTE: no pagination if only one page
  if (pageCount <= 1) return null;

  return (
    <div>
      <h1>Pagination</h1>
      <div>
        {result.map((post) => (
          <h2 key={post.title}>
            {post.id} {post.title}
          </h2>
        ))}
      </div>
      {/* create next and prev button */}
      <div>
        <p>
          Showing {/* 10 is the magic number */}
          <span style={{ fontWeight: "bold" }}>
            {(currentPage - 1) * PAGE_SIZE + 1}
          </span>{" "}
          to{" "}
          <span style={{ fontWeight: "bold" }}>
            {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
          </span>{" "}
          of <span style={{ fontWeight: "bold" }}>{count}</span> results
        </p>
        <button onClick={prevPage} disabled={currentPage === 1}>
          &larr; Prev
        </button>
        <button onClick={nextPage} disabled={currentPage === pageCount}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default PaginationComponent;

