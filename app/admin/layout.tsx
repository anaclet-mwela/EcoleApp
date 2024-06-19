
import Logout from "../components/Logout";
import SideBar from "../components/SideBar"

function Layout ({ children }) {

  return (
    <div className="flex">
    <SideBar />
      <div className="bg-slate-200 flex-1">
        {/* Quick access bar */}
        <div className="flex items-center gap-8 px-8 py-4 justify-between bg-orange-500">
          <div className="flex gap-4">
            
          </div>
          <div>
            <Logout />
          </div>
          </div>
        <div className="flex flex-col justify-between flex-1">
          {children}
          <div className="text-sm text-orange-400 text-center">
            <p>&copy;2024 - Travail de Mémoire Deborah</p>
          </div>
        </div>
         
      </div>
     
    </div>
  );
}

export default Layout;
