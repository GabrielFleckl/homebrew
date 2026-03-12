import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Contact from "../components/pages/Contact";
import UserProfile from "../components/user/UserProfile";
import Ranking from "../components/pages/Ranking";
import PrivateRoute from "../components/auth/PrivateRoute";
import RankingUserDetails from "../components/pages/RankingUserDetails";
import NotFound404 from "../components/pages/NotFound404";
import Blog from "../components/pages/Blog";
import BlogPost from "../components/pages/BlogPost";
import Meetings from "@/components/pages/Meetings";

function AppRoutes() {
  return (
    <>
      {/* max-w-(--breakpoint-2xl) px-8 pt-4 */}
      <main className="m-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastrar" element={<Register />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/eventos" element={<Meetings />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:slug" element={<BlogPost />} />

          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <PrivateRoute>
                <Ranking />
              </PrivateRoute>
            }
          />

          <Route
            path="/user/:userId"
            element={
              <PrivateRoute>
                <RankingUserDetails />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </main>
    </>
  );
}

export default AppRoutes;
