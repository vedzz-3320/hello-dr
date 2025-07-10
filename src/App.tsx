
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Profile from "./pages/Profile";
import MyDoctors from "./pages/MyDoctors";
import MedicalRecords from "./pages/MedicalRecords";
import FavoriteDoctors from "./pages/FavoriteDoctors";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HelpCenter from "./pages/HelpCenter";
import Settings from "./pages/Settings";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorSlots from "./pages/DoctorSlots";
import DoctorPrescriptions from "./pages/DoctorPrescriptions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-slots" element={<DoctorSlots />} />
          <Route path="/doctor-prescriptions" element={<DoctorPrescriptions />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctor/:id" element={<DoctorProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-doctors" element={<MyDoctors />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/favorite-doctors" element={<FavoriteDoctors />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
