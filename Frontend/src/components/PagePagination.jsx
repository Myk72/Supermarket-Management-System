import React, { useState, useEffect } from "react";

const PagePagination = ({ Items, setCurrentItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const newCurrentItems = Items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setCurrentItems(newCurrentItems);
  }, [Items, currentPage, itemsPerPage, setCurrentItems]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (Items.length === 0) {
    return <div></div>;
  }
  const totalPages = Math.ceil(Items.length / itemsPerPage);

  return (
    <div className="flex justify-between mt-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PagePagination;
