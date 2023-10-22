import Section from "../main/Section";
import Footer from "../main/Footer";
import Header from "../main/Header";

const Main = ({ children }) => {
  return (
    <main className="relative flex flex-col min-h-screen flex-1 w-full overflow-hidden overflow-x-auto">
      <Header />
      <Section>{children}</Section>
      <Footer />
    </main>
  );
};

export default Main;
