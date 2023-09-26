import styles from "./App.module.css";
import Cards from "../Shared/Cards";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAppointment,
  deleteAppointment,
} from "../../Redux/Appointment/thunks";
import SearchBar from "../Shared/SearchBar";
import ConfirmModal from "../Shared/ConfirmModal";
import Loader from "../Shared/Loader";
import Form from "../Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../Shared/Modal";
import { deletePet, getPet } from "../../Redux/Pet/thunk";

function App() {
  const appointment = useSelector((state) => state.appointment.data);
  const isPending = useSelector((state) => state.appointment.pending);
  const dispatch = useDispatch();
  const [filteredAppointment, setFilteredAppointment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmIdtoDelete, setConfirmIdToDelete] = useState("");
  const [idToEdit, setIdtoEdit] = useState("");
  const [viewForm, setViewForm] = useState(false);
  const [toastModal, setToastModal] = useState("");
  const [showToastModal, setShowToastModal] = useState(false);
  const [pageTitle, setPageTitle] = useState("Veterinary");
  const [confirmPetIdToDelete, setConfirmPetIdToDelete] = useState("");

  useEffect(() => {
    dispatch(getAppointment());
    dispatch(getPet());
  }, [dispatch]);

  useEffect(() => {
    if (appointment && appointment.length > 0) {
      setFilteredAppointment(appointment);
    }
  }, [appointment]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const handlerFilter = (value) => {
    const filter = appointment.filter((appointments) => {
      const filterNameOrClientID =
        `${appointments.name} ${appointments.lastName} ${appointments.clientID}`
          .toLowerCase()
          .includes(value);
      return filterNameOrClientID;
    });
    setFilteredAppointment(filter);
  };

  function isoToNormalDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const totalPages = Math.ceil(filteredAppointment.length / 8);

  const pageNumber = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const lastIndex = currentPage * 8;
  const firstIndex = lastIndex - 8;

  const itemToShow = filteredAppointment.slice(firstIndex, lastIndex);

  useEffect(() => {
    if (itemToShow.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [itemToShow, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlerConfirmModal = (idAppointment, idPet) => {
    setConfirmPetIdToDelete(idPet);
    setConfirmIdToDelete(idAppointment);
    setConfirmModal(true);
    setPageTitle("Remove User");
    document.body.classList.add(styles.noScroll);
  };

  const handleDelete = () => {
    dispatch(deleteAppointment(confirmIdtoDelete));
    dispatch(deletePet(confirmPetIdToDelete))
      .then(() => {
        dispatch(getAppointment());
        setConfirmModal(false);
        setConfirmIdToDelete(false);
        setToastModal("Deleted Successfull");
        setShowToastModal(true);
        document.body.classList.remove(styles.noScroll);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlerViewForm = (id) => {
    setViewForm(true);
    setIdtoEdit(id);
    document.body.classList.add(styles.noScroll);
    if (id) {
      setPageTitle("Edit User");
    } else {
      setPageTitle("Create User");
    }
  };

  const handleCloseModal = () => {
    setConfirmModal(false);
    setPageTitle("Veterinary");
    document.body.classList.remove(styles.noScroll);
  };

  const handleCloseForm = () => {
    setViewForm(false);
    setIdtoEdit("");
    document.body.classList.remove(styles.noScroll);
    setPageTitle("Veterinary");
  };

  const handleResetId = () => {
    setIdtoEdit("");
  };

  const handleFilterClient = (value) => {
    if (value === true) {
      const filter = appointment.filter((appointments) => {
        return appointments.isClient === true;
      });
      setFilteredAppointment(filter);
    } else if (value === false) {
      const filter = appointment.filter((appointments) => {
        return appointments.isClient === false;
      });
      setFilteredAppointment(filter);
    } else {
      const filter = appointment.filter((appointments) => {
        return appointments;
      });
      setFilteredAppointment(filter);
    }
  };

  if (isPending) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>VETERINARY</h1>
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.filter}>
          <SearchBar
            name={"Filter: "}
            placeholder={"Filter with name, last name or ID"}
            action={(e) => handlerFilter(e.target.value.toLowerCase())}
          />
          <div className={styles.filterClient}>
            <button onClick={() => handleFilterClient()}>All</button>
            <button onClick={() => handleFilterClient(true)}>Client</button>
            <button onClick={() => handleFilterClient(false)}>No Client</button>
          </div>
        </div>
        <div className={styles.add} onClick={() => handlerViewForm()}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>

      {filteredAppointment.length === 0 ? (
        <div className={styles.notFoundContainer}>
          <div className={styles.notFound}>
            <p>NO USER FOUND WITH THE NAME OR SURNAME ENTERED</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.cards}>
        {itemToShow.map((appointments) => (
          <div key={appointments._id}>
            <Cards
              name={appointments.name.toUpperCase()}
              lastName={appointments.lastName.toUpperCase()}
              clientID={appointments.clientID}
              address={appointments.address}
              phone={appointments.phone}
              paidMonth={appointments.paidMonth}
              date={isoToNormalDate(appointments.date)}
              actionView={() => handlerViewForm(appointments._id)}
              actionDelete={() =>
                handlerConfirmModal(appointments._id, appointments.pet[0]?._id)
              }
            />
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.paginationContainer}>
          <div
            className={currentPage === 1 ? styles.disabled : styles.previous}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          </div>
          <div className={styles.pages}>
            {pageNumber.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={styles.pagination}
              >
                {page}
              </button>
            ))}
          </div>
          {console.log(pageNumber)}
          <div
            className={
              currentPage === totalPages ? styles.disabled : styles.next
            }
          >
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
      {confirmModal && (
        <ConfirmModal
          actionDelete={handleDelete}
          actionCancel={handleCloseModal}
          title="Delete Appointment"
        />
      )}
      {viewForm && (
        <Form
          id={idToEdit}
          close={handleCloseForm}
          resetId={handleResetId}
          showToastModal={setShowToastModal}
          setMessageModal={setToastModal}
        />
      )}
      {showToastModal && (
        <Modal message={toastModal} close={() => setShowToastModal(false)} />
      )}
    </div>
  );
}

export default App;
