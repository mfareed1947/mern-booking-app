import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./context/app-context";

import EditHotel from "./pages/edit-hotel";
import AddHotel from "./pages/add-hotel";
import Register from "./pages/register";
import MyHotel from "./pages/my-hotel";
import SignIn from "./pages/sign-in";
import Search from "./pages/search";

import Layout from "./layout/Layout";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<p className="text-2xl text-red-600">hello World</p>}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/sign-in" element={<SignIn />} />
            {isLoggedIn && (
              <>
                <Route path="/add-hotel" element={<AddHotel />} />
                <Route path="/my-hotels" element={<MyHotel />} />
                <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
