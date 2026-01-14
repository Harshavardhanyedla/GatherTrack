import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateGathering from './pages/CreateGathering';
import PersonRegister from './pages/PersonRegister';
import ScanPage from './pages/ScanPage';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-gathering" element={<CreateGathering />} />
            <Route path="register-person" element={<PersonRegister />} />
            <Route path="scan/:gatheringId" element={<ScanPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
