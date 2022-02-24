// Components
import Header from "./header/header";
import Bottom from "./bottom/bottom";

// Summary: Creates the common visual components for the private pages
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="body">{children}</div>
      <Bottom />
    </>
  );
};

export default Layout;
