import styles from "./App.module.css";
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
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

    return `${day}-${month}-${year}`;
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

  if (isPending) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className={styles.container}>
      <div className="flex">
        <aside className="w-12/12 p-4 bg-gray-200 md-sm:hidden inline">
          <h2>Aside Content</h2>
        </aside>
      </div>
      <div className="mx-auto w-8/12 mt-20">
        <div className="flex flex-col">
          <div className="flex items-center bg-white p-3 shadow-lg">
            <h5 className="font-title font-bold text-title mr-3">Veterinary</h5>
            <ul className="border-l border-titleColor px-5">
              <li className="font-title text-subtitle text-titleColor">
                Client
              </li>
            </ul>
          </div>
          <div className="flex justify-between w-full my-10">
            <SearchBar
              name={"Filter: "}
              placeholder={"Filter with name, last name or ID"}
              action={(e) => handlerFilter(e.target.value.toLowerCase())}
            />
            <button
              className="w-20 py-2 rounded bg-blue-600 text-white font-bold text-sm hover:bg-blue-700"
              onClick={() => handlerViewForm()}
            >
              Add Client
            </button>
          </div>
          <div className="w-full overflow-x-scroll md:overflow-hidden p-3 bg-white shadow-lg">
            <table className="w-full bg-white border-collapse">
              <thead className=" text-black bg-bg-table font-bold">
                <tr>
                  <th className="px-4 py-3 sm:w-1/6">Client</th>
                  <th className="px-4 py-3 sm:w-1/6 ">Name</th>
                  <th className="px-4 py-3 sm:w-1/6">Last Name</th>
                  <th className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
                    Address
                  </th>
                  <th className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
                    Paid Month
                  </th>
                  <th className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
                    Date
                  </th>
                  <th className="px-4 py-3 sm:w-1/6"></th>
                  <th className="px-4 py-3 sm:w-1/6"></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {itemToShow.map((appointments) => (
                  <tr
                    key={appointments._id}
                    className="border-t border-gr text-black text-subtitle"
                  >
                    <td
                      className={
                        appointments.clientID === "No Client"
                          ? "px-4 py-3 sm:w-1/6 text-red-300"
                          : "px-4 py-3 sm:w-1/6"
                      }
                    >
                      {appointments.clientID}
                    </td>
                    <td className="px-4 py-3 sm:w-1/6">{appointments.name}</td>
                    <td className="px-4 py-3 sm:w-1/6">
                      {appointments.lastName}
                    </td>
                    <td className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
                      {appointments.address}
                    </td>
                    <td className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
                      {appointments.paidMonth}
                    </td>
                    <td className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
                      {isoToNormalDate(appointments.date)}
                    </td>
                    <td className="px-4 py-3 sm:w-1/6">
                      <span
                        onClick={() => handlerViewForm(appointments._id)}
                        className="text-blue-500 cursor-pointer font-bold hover:text-blue-700"
                      >
                        EDIT
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:w-1/6">
                      <span
                        onClick={() =>
                          handlerConfirmModal(
                            appointments._id,
                            appointments.pet[0]?._id
                          )
                        }
                        className="text-red-500 cursor-pointer font-bold hover:text-red-700"
                      >
                        DELETE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAppointment.length === 0 ? (
              <div className={styles.notFoundContainer}>
                <div className={styles.notFound}>
                  <p>NO USER FOUND WITH THE NAME OR SURNAME ENTERED</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className={styles.buttonContainer}>
            <div className={styles.paginationContainer}>
              <div
                className={
                  currentPage === 1 ? styles.disabled : styles.previous
                }
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
