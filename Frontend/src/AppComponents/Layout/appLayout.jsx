import { Sidebar, Navbar } from "../Navigation";

const AppLayout = () => (WrapperComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return (
      <div className="flex max-h-screen  bg-white">
        <Sidebar />
        <div className=" flex flex-1 flex-col items-center">
          <div className=" w-[80vw] flex-1  h-full p-1">
            <WrapperComponent {...props} />
          </div>
        </div>
      </div>
    );
  };
};
export { AppLayout };
