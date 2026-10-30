import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ToastProvider } from './components/Toast';
import { AppProvider, useApp } from './contexts/AppContext';
import { BookingsProvider } from './contexts/BookingsContext';
import { ShopProvider } from './contexts/ShopContext';
import { PlayerShell } from './components/layout/PlayerShell';
import { AdminShell } from './components/layout/AdminShell';
import { StaffShell } from './components/layout/StaffShell';
import { Onboarding } from './pages/player/Onboarding';
import { Home } from './pages/player/Home';
import { CourtDetail } from './pages/player/CourtDetail';
import { BookCourt } from './pages/player/BookCourt';
import { BookingConfirmed } from './pages/player/BookingConfirmed';
import { MyBookings } from './pages/player/MyBookings';
import { CheckIn } from './pages/player/CheckIn';
import { ShopHome } from './pages/player/ShopHome';
import { Rentals } from './pages/player/Rentals';
import { ProductDetail } from './pages/player/ProductDetail';
import { Cart } from './pages/player/Cart';
import { Orders } from './pages/player/Orders';
import { Events } from './pages/player/Events';
import { EventDetail } from './pages/player/EventDetail';
import { EventRegister } from './pages/player/EventRegister';
import { LiveBracket } from './pages/player/LiveBracket';
import { Profile } from './pages/player/Profile';
import { Scanner } from './pages/staff/Scanner';
import { Schedule } from './pages/staff/Schedule';
import { StaffOverview } from './pages/staff/StaffOverview';
import { Overview } from './pages/admin/Overview';
import { OwnerOverview } from './pages/admin/OwnerOverview';
import { Bookings } from './pages/admin/Bookings';
import { Calendar } from './pages/admin/Calendar';
import { Venues } from './pages/admin/Venues';
import { Tournaments } from './pages/admin/Tournaments';
import { ShopAdmin } from './pages/admin/ShopAdmin';
import { Users } from './pages/admin/Users';
import { Reports } from './pages/admin/Reports';
import { NotFound } from './pages/NotFound';
function RootRedirect() {
  const { onboarded } = useApp();
  return <Navigate to={onboarded ? '/courts' : '/onboarding'} replace />;
}
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}
function App({ ownerVenueId = 'v-ayala' }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <AppProvider>
          <BookingsProvider>
            <ShopProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<RootRedirect />} />
                  <Route path="/onboarding" element={<Onboarding />} />
                  <Route element={<PlayerShell />}>
                    <Route path="/courts" element={<Home />} />
                    <Route path="/courts/:venueId" element={<CourtDetail />} />
                    <Route path="/book/:venueId" element={<BookCourt />} />
                    <Route path="/bookings" element={<MyBookings />} />
                    <Route path="/bookings/:id/confirmed" element={<BookingConfirmed />} />
                    <Route path="/bookings/:id/checkin" element={<CheckIn />} />
                    <Route path="/shop" element={<ShopHome />} />
                    <Route path="/rentals" element={<Rentals />} />
                    <Route path="/shop/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/events/:id/register" element={<EventRegister />} />
                    <Route path="/events/:id/bracket" element={<LiveBracket />} />
                    <Route path="/profile" element={<Profile />} />
                  </Route>
                  <Route path="/staff" element={<StaffShell />}>
                    <Route index element={<Navigate to="/staff/overview" replace />} />
                    <Route path="overview" element={<StaffOverview />} />
                    <Route path="scan" element={<Scanner />} />
                    <Route path="schedule" element={<Schedule />} />
                  </Route>
                  <Route path="/admin" element={<AdminShell />}>
                    <Route index element={<Overview />} />
                    <Route path="owner" element={<OwnerOverview venueId={ownerVenueId} />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="venues" element={<Venues />} />
                    <Route path="tournaments" element={<Tournaments />} />
                    <Route path="shop" element={<ShopAdmin />} />
                    <Route path="users" element={<Users />} />
                    <Route path="reports" element={<Reports />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ShopProvider>
          </BookingsProvider>
        </AppProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
export { App };
