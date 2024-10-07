import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@components/common/Layout";
import { MainPage } from "@pages/main/main";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* main page */}
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
