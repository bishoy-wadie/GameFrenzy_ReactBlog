function Pagination({ postsPerPage, totalPosts, currentPage, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="btn-group">
      {pageNumbers.map((pageNumber) => (
        <>
          <button
            key={pageNumber}
            className={`btn btn-${
              pageNumber === currentPage ? "active" : ""
            } btn-outline btn-accent
            `}
            onClick={onPageChange}
          >
            {pageNumber}
          </button>
        </>
      ))}
    </div>
  );
}

export default Pagination;
