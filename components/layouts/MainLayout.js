import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Seo from "@/components/common/Seo";

const MainLayout = ({ children, header = true }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo />
      {header && <Header />}
      <main className="flex-grow bg-gradient-to-r from-purple-600 via-cyan-700 to-emerald-500">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
