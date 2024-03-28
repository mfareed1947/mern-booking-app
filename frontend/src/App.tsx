import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Layout from "./layout/Layout";
import SignIn from "./pages/sign-in";

function App() {
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
