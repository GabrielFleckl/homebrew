function Tag({ children }) {
  return (
    <span className="rounded-sm bg-yellow-700/90 px-4 text-sm text-white capitalize">
      {children}
    </span>
  );
}

export default Tag;
