import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@components/common/Layout";
import { MainPage } from "@pages/main/main";
import { LoginPage } from "@pages/login/login";
import { WeeklyMenuPage } from "@pages/weekly-menu/weekly-menu";
import { SettingPage } from "@pages/setting/setting";
import { TabNavigator } from "@components/common/TabNavigator";
import { Errorpage } from "@pages/error/error";
import { useEffect, useState } from "react";
import { Splash } from "@components/common/Splash";

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  useEffect(() => {
    const checkFirstVisit = () => {
      const isFirstVisit = !sessionStorage.getItem("visited");

      if (isFirstVisit) {
        setTimeout(() => {
          setIsSplashVisible(false);
          sessionStorage.setItem("visited", "true");
        }, 2000);
      } else {
        setIsSplashVisible(false);
      }
    };
    checkFirstVisit();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        {isSplashVisible ? (
          <Splash />
        ) : (
          <>
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
            <TabNavigator />
          </>
        )}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
