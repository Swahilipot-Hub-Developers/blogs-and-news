import SidePane from "../User/SidePane";

const Layout = ({ children}) => {
    return (
      <div className="homePoint" style={{display:"flex"}}>
        <SidePane  />
        <main className="childrenMain">{children}</main>
      </div>
    );
  };
  
  export default Layout;