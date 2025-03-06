import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Authorization from "./components/authorization/Authorization";
import PersonalCabinet from "./components/patient/Patient";
import Confirm from "./components/authorization/Confirm";
import Registration from "../src/components/registration/Registration" // жай стоит
import { useAppDispatch } from "./features/redux/hooks";
import { checkAuth } from "./features/redux/slices/authSlice";
import ProtectedRoute from "./features/ProtectedRoute";

function App() {
  const dispatch = useAppDispatch();
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    // При монтировании (или обновлении) приложения проверяем авторизацию
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Главная страница";
        metaDescription = "Описание главной страницы";
        break;
      case "/authorization":
        title = "Авторизация";
        metaDescription = "Описание страницы авторизации";
        break;
      case "/patient":
        title = "Личный кабинет";
        metaDescription = "Описание личного кабинета";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  
  console.log("uzhe tut")
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/authorization" element={<Authorization />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/patient" element={<ProtectedRoute> <PersonalCabinet /> </ProtectedRoute>} />
    </Routes>
  );
}
export default App;
//В точке входа (например, main.tsx или index.tsx) обязательно оборачиваем <Provider store={store}>.