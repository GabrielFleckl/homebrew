function ArrowLeft({ dark }) {
  return (
    <>
      <svg
        width="42px"
        height="42px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M20 12H4M4 12L10 6M4 12L10 18"
            stroke={dark ? "#191919" : "#f9f9f9"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
    </>
  );
}

export default ArrowLeft;
