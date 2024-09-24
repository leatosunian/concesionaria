const LoaderFullscreen = () => {
  return (
    <>
      <div className="absolute flex items-center justify-center w-full h-full bg-white" style={{ zIndex: "99999999" }}>
        <div className=" loader"></div>
      </div>
    </>
  );
};
export default LoaderFullscreen;
