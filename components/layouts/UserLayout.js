import Footer from "@/components/common/Footer";
import HeaderUser from "@/components/common/HeaderUser";
import Seo from "@/components/common/Seo";

const UserLayout = ({ children, header = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo />
      {header && <HeaderUser />}   
         <main className="flex-grow bg-gradient-to-r from-purple-600 via-cyan-700 to-emerald-500">{children}</main>
      <Footer />
    </div>
  );
  
};

export default UserLayout;

