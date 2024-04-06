function Spinner() {
  return (
    <div role="status" className="flex items-center justify-center ">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-4 border-b-4 border-primary animate-spin"></div>
      </div>
    </div>
  );
}

export default Spinner;
