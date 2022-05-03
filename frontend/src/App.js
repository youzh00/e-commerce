import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import "./index.css";
import { HomeScreen } from "./Screens/HomeScreen";
function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
