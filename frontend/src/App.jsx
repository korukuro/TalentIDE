import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import { Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
function App() {
  const { isSignedIn } = useUser(); //?isSignedIn is a boolean that indicates whether the user is signed in or not. Its provided by clerk-react library.
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster toastOptions={{duration:3000}}/>
    </>
  );
}

export default App;
