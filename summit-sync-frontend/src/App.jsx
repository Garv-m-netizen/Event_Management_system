// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import StartupDashboard from "./pages/StartupDashboard";
// import InvestorDashboard from "./pages/InvestorDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import RoleRoute from "./components/RoleRoute";
// import RootRedirect from "./pages/RootRedirect";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/redirect" element={<RootRedirect />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/startup"
//           element={
//             <ProtectedRoute>
//               <RoleRoute role="startup">
//                 <StartupDashboard />
//               </RoleRoute>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/investor"
//           element={
//             <ProtectedRoute>
//               <RoleRoute role="investor">
//                 <InvestorDashboard />
//               </RoleRoute>
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// function App() {
//   return (
//     <div style={{ padding: "40px", color: "black" }}>
//       <h1>APP IS RENDERING</h1>
//     </div>
//   );
// }

// export default App;


import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

