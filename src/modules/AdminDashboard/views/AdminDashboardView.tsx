import UploadRacingSummary from "../components/UploadRacingSummary";
import CreateEvent from "../components/CreateEvent";
import AddNewTrack from "../components/AddNewTrack";
import AdminNavigation from "../components/AdminNavigation";
import ModalWrapper from "@/lib/components/ModalWrapper";
import { useAdminModal } from "@/hooks/useAdminModal";
import { ViewLeagues } from "@/lib/components/modals/ViewLeagues";
import { ViewEvents } from "@/lib/components/modals/ViewEvents";
import { ViewTracks } from "@/lib/components/modals/ViewTracks";
import '@/styles/modules/AdminDashboard/AdminDashboardView.css';

export default function AdminDashboardView() {
  const { modalType, openModal, closeModal } = useAdminModal();

  const renderContent = () => {
    switch (modalType) {
      case "leagues":
        return <ViewLeagues />;
      case "events":
        return <ViewEvents />;
      case "tracks":
        return <ViewTracks />;
      default:
        return null;
    }
  };

  return (
    <section className="admin-dashboard-container relative">
      <AdminNavigation openModal={openModal} />
      <UploadRacingSummary />
      <CreateEvent />
      <AddNewTrack />

      <ModalWrapper isOpen={!!modalType} onClose={closeModal} title={`Administrar ${modalType}`}>
        {renderContent()}
      </ModalWrapper>
    </section>
  );
}
