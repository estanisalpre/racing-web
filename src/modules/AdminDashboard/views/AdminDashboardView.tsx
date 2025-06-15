import UploadRacingSummary from "../components/UploadRacingSummary"
import CreateEvent from "../components/CreateEvent";
import AddNewTrack from "../components/AddNewTrack";
import '@/styles/modules/AdminDashboard/AdminDashboardView.css';

export default function AdminDashboardView() {
  return (
    <section className="admin-dashboard-container">
      <UploadRacingSummary />
      <CreateEvent />
      <AddNewTrack />
    </section>
  )
}
