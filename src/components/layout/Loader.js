function Loader() {
  return (
    <div className="w-full h-full fixed top-0 left-0 bg-white opacity-100 z-50">
      <div className="flex flex-col items-center justify-center h-screen gap-5">
        <h2 className="text-primary font-semibold text-4xl" href={"/"}>
          YumYard
        </h2>
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
