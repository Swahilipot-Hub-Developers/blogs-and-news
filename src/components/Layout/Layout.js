import SidePane from "../User/SidePane";

const Layout = ({ children, username }) => {
    return (
      <div className="home" style={{display:"flex"}}>
        <SidePane username={username} />
        <main className="childrenMain">{children}</main>
      </div>
    );
  };
  
  export default Layout;