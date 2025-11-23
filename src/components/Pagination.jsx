// import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = [];

//   // Create page numbers (you can enhance this with ellipsis logic)
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex items-center justify-center gap-2 mt-6">
//       {/* Previous Button */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`px-3 py-1 rounded-lg border text-sm font-medium transition
//           ${
//             currentPage === 1
//               ? "text-gray-400 border-gray-300 cursor-not-allowed"
//               : "text-gray-700 border-gray-400 hover:bg-gray-100"
//           }`}
//       >
//         Prev
//       </button>

//       {/* Page Numbers */}
//       {pageNumbers.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={`px-3 py-1 rounded-lg border text-sm font-medium transition
//             ${
//               currentPage === page
//                 ? "bg-[#c586a5] text-white border-[#c586a5]"
//                 : "text-gray-700 border-gray-400 hover:bg-gray-100"
//             }`}
//         >
//           {page}
//         </button>
//       ))}

//       {/* Next Button */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`px-3 py-1 rounded-lg border text-sm font-medium transition
//           ${
//             currentPage === totalPages
//               ? "text-gray-400 border-gray-300 cursor-not-allowed"
//               : "text-gray-700 border-gray-400 hover:bg-gray-100"
//           }`}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 1; // pages around current page

    // Always show first page
    pages.push(1);

    // Left ellipsis
    if (currentPage > maxVisible + 2) {
      pages.push("...");
    }

    // Middle pages
    for (
      let i = Math.max(2, currentPage - maxVisible);
      i <= Math.min(totalPages - 1, currentPage + maxVisible);
      i++
    ) {
      pages.push(i);
    }

    // Right ellipsis
    if (currentPage < totalPages - (maxVisible + 1)) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg border text-sm font-medium transition 
        ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-400 hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {/* Pages */}
      {pages.map((page, index) => (
        <button
          key={index}
          disabled={page === "..."}
          onClick={() => page !== "..." && onPageChange(page)}
          className={`px-3 py-1 rounded-lg border text-sm font-medium transition
            ${
              currentPage === page
                ? "bg-[#c586a5] text-white border-[#c586a5]"
                : page === "..."
                ? "cursor-default border-transparent"
                : "text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg border text-sm font-medium transition 
        ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-400 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
