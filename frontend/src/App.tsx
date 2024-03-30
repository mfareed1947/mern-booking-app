import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Layout from "./layout/Layout";
import SignIn from "./pages/sign-in";
import { useAppContext } from "./context/app-context";
import AddHotel from "./pages/add-hotel";

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
            {!isLoggedIn && (
              <>
                <Route path="/add-hotel" element={<AddHotel />} />
              </>
            )}
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
