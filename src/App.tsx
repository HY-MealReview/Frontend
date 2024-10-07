import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@components/common/Layout";
import { MainPage } from "@pages/main/main";
import { LoginPage } from "@pages/login/login";
import { WeeklyMenuPage } from "@pages/weekly-menu/weekly-menu";
import { SettingPage } from "@pages/setting/setting";
import { TabNavigator } from "@components/common/TabNavigator";
import { Errorpage } from "@pages/error/error";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* main page */}
          <Route path="/" element={<MainPage />} />

          {/* login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* weekly menu page */}
          <Route path="/weekly-menu" element={<WeeklyMenuPage />} />

          {/* setting page */}
          <Route path="/setting" element={<SettingPage />} />

          {/* error page */}
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </Layout>
      <TabNavigator />
    </BrowserRouter>
  );
}

export default App;
