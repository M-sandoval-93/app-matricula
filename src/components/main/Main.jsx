import Section from "../main/Section";
import Footer from "../main/Footer";
import Header from "../main/Header";

const Main = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen flex-1">
      <Header />
      <Section>{children}</Section>
      <Footer />
    </main>
  );
};

export default Main;
