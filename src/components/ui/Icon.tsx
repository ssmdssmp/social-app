export default function Icon({ children, counter }: any) {
  return (
    <div className=" relative h-10 w-10 flex justify-center rounded-sm items-center cursor-pointer hover:border-white border-transparent border transition-all duration-300">
      {children}
      {counter && (
        <span className="flex items-center justify-center absolute w-3 h-3 bg-white top-0 right-0 bg-red-500 rounded-full text-white text-xs">
          {counter}
        </span>
      )}
    </div>
  );
}
