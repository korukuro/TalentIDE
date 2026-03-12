import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import { Navigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
function App() {
  const { isSignedIn, isLoaded } = useUser(); //?isSignedIn is a boolean that indicates whether the user is signed in or not. Its provided by clerk-react library.
  
  if(!isLoaded) return null;
  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to = {"/dashboard"}/>} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problem/:id"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster toastOptions={{duration:3000}}/> 
    </>
  );
}

export default App;
