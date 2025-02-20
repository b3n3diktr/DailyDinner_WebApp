import './global.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from './routes/Home';
import NavBar from "./components/NavBar";
import NotFoundPage from "./routes/NotFoundPage";
import Footer from "./components/Footer";
import Copyright from "./components/Copyright";
import SignIn from "./routes/Login_Registration/SignIn";
import Register from "./routes/Login_Registration/Register";
import ScrollTop from "./components/ScrollTop";
import ResetPassword from "./routes/Login_Registration/ResetPassword";
import FallbackPage from "./components/FallBackPage";
import ActivateAccount from "./routes/Login_Registration/ActivateAccount";
import CookieConsent from "./components/CookieConsent";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import MyAccount from "./routes/MyAccount/MyAccount";
import NewRecipe from "./routes/Recipe/NewRecipe";
import Recipes from "./routes/Recipe/Recipes";
import RecipeDetailPage from "./routes/Recipe/RecipeDetailPage";

function App() {
    return (
        <Router>
            <ScrollTop/>
            <NavBar />
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword/>} />
                <Route path="/fallback" element={<FallbackPage/>} />
                <Route path="/activate" element={<ActivateAccount/>}/>_
                <Route path="/myaccount" element={<MyAccount/>} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="recipes/new" element={<NewRecipe/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <Footer />
            <Copyright/>
            <CookieConsent/>
        </Router>
    );
}

export default App;
