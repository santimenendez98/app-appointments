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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Shared/Modal";

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
  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    dispatch(getAppointment());
  }, [dispatch]);

  useEffect(() => {
    if (appointment && appointment.length > 0) {
      setFilteredAppointment(appointment);
    }
  }, [appointment]);

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

  const lastIndex = currentPage * 12;

  const firstIndex = lastIndex - 12;

  const itemToShow = filteredAppointment.slice(firstIndex, lastIndex);

  const handlerClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlerClickNext = () => {
    if (lastIndex < filteredAppointment.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlerConfirmModal = (id) => {
    setConfirmIdToDelete(id);
    setConfirmModal(true);
  };

  const handleDelete = () => {
    dispatch(deleteAppointment(confirmIdtoDelete))
      .then(() => {
        dispatch(getAppointment());
        setConfirmModal(false);
        setConfirmIdToDelete(false);
        setToastModal("Deleted Successfull");
        setShowToastModal(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlerViewForm = (id) => {
    setViewForm(true);
    setIdtoEdit(id);
  };

  const handleCloseModal = () => {
    setConfirmModal(false);
  };

  const handleCloseForm = () => {
    setViewForm(false);
    setIdtoEdit("");
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
        <h1>APPOINTMENTS</h1>
      </div>
      <div className={styles.filterContainer}>
        <div className={styles.filter}>
          <SearchBar
            name={"Filter: "}
            action={(e) => handlerFilter(e.target.value.toLowerCase())}
          />
        </div>
        <div className={styles.add} onClick={() => setViewForm(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div>
        <button onClick={() => handleFilterClient()}>All</button>
        <button onClick={() => handleFilterClient(true)}>Client</button>
        <button onClick={() => handleFilterClient(false)}>No Client</button>
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
              actionDelete={() => handlerConfirmModal(appointments._id)}
            />
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.paginationContainer}>
          <button
            onClick={handlerClickPrevious}
            className={
              currentPage === 1 ? styles.disabledPagination : styles.pagination
            }
          >
            Previous
          </button>
          <button
            onClick={handlerClickNext}
            className={
              lastIndex >= filteredAppointment.length
                ? styles.disabledPagination
                : styles.pagination
            }
          >
            Next
          </button>
        </div>
      </div>
      {confirmModal && (
        <ConfirmModal
          actionDelete={handleDelete}
          actionCancel={handleCloseModal}
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
