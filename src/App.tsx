
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import SplashScreen from "./pages/SplashScreen";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";
import Search from "./pages/Search";
import AddItem from "./pages/AddItem";
import Messages from "./pages/Messages";
import ChatDetail from "./pages/ChatDetail";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import SpinWheelPage from "./pages/SpinWheelPage";
import WalletPage from "./pages/WalletPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Home />} />
                  <Route path="item/:id" element={<ItemDetail />} />
                  <Route path="search" element={<Search />} />
                  <Route path="add-item" element={<AddItem />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="chat/:conversationId" element={<ChatDetail />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="spin-wheel" element={<SpinWheelPage />} />
                  <Route path="wallet" element={<WalletPage />} />
                </Route>
                <Route path="/welcome" element={<Navigate to="/splash" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
