import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PublicLayout({
  children,
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default PublicLayout;