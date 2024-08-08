function Wrapper({
    children,
    className,
    right,
    left,
    oneHalf,
    twoThirds,
    full,
    closeFull,
  }) {
    return (
      <div
        className={`${className} ${
          oneHalf
            ? "w-6/12"
            : twoThirds
            ? "w-8/12"
            : closeFull
            ? "w-10/12"
            : full
            ? "w-full"
            : "w-11/12"
        } h-full ${
          left ? "mr-auto" : right ? "ml-auto" : "mx-auto"
        } 2xl:w-[1400px]`}
      >
        {children}
      </div>
    );
  }
  export default Wrapper;
  