import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import AccommodationDetails from "./Pages/AccommodationDetails";
import AccommodationList from "./Pages/AccommodationList";
import Navbar from "./Components/Navbar/Navbar";
import AccommodationFormPage from "./Pages/AccommodationFormPage";
import TempReservationForm from "./Pages/TemporaryReservationFormPage";



export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/accommodation/all" element={<AccommodationList />} />
        <Route path="/accommodation/:id" element={<AccommodationDetails />} />
        <Route path="/accommodation/accommodations" element={<AccommodationFormPage />} />
        <Route path="accommodation/edit/:id" element={<AccommodationFormPage/>} />
        <Route path="/accommodation/temp-reservation" element={<TempReservationForm />} />

      </Routes>
    </Router>
  );
}