import styles from "./user.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SearchBar from "../Shared/SearchBar";
import Loader from "../Shared/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Aside from "../Aside";
import { getUser } from "../../Redux/User/thunk";
import UserForm from "../UserForm";

function Users() {
  const user = useSelector((state) => state.user.data);
  const isPending = useSelector((state) => state.user.pending);
  const [showAside, setShowAside] = useState(false);
  const [filteredUser, setFilteredUser] = useState([]);
  const [showUserForm, setUserForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.length > 0) {
      setFilteredUser(user);
    }
  }, [user]);

  function isoToNormalDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${day}-${month}-${year}`;
  }

  function filterUser (e) {
    const filter = user.filter((user) => {
      const filterNameOrClientID =
        `${user.name} ${user.lastName} ${user.email}`
          .toLowerCase()
          .includes(e);
      return filterNameOrClientID;
    });
    setFilteredUser(filter);
  }

  if (isPending) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className={styles.container}>
      <div className="mx-auto w-11/12 mt-10 res-table:mt-20 res-table:w-10/12">
        <div className="flex flex-col">
          <div className="flex items-center bg-white p-3 shadow-lg">
            <div className="login-img:flex login-img:mr-10 hidden">
              <FontAwesomeIcon
                icon={faBars}
                size="lg"
                onClick={() => setShowAside(!showAside)}
              />
            </div>
            <h5 className="font-title font-bold text-title mr-3">Veterinary</h5>
            <ul className="border-l border-titleColor px-5">
              <li className="font-title text-subtitle text-titleColor">
                Users
              </li>
            </ul>
          </div>
          <div className="flex justify-between w-full my-10">
            <SearchBar
              name={"Filter: "}
              action={(e) => filterUser(e.target.value)}
              placeholder={"Filter with name, last name or ID"}
            />
            <button className="w-20 py-2 rounded bg-blue-600 text-white font-bold text-sm hover:bg-blue-700" onClick={() => setUserForm(!showUserForm)}>
              Add User
            </button>
          </div>
          <div className="w-full overflow-x-scroll md:overflow-hidden p-3 bg-white shadow-lg">
            <table className="w-full bg-white border-collapse">
              <thead className=" text-black bg-bg-table font-bold w-full">
                <tr>
                  <th className="px-4 py-3 sm:w-1/6">Name</th>
                  <th className="px-4 py-3 sm:w-1/6 ">Last Name</th>
                  <th className="px-4 py-3 sm:w-1/6 hidden res-user-email:table-cell">Email</th>
                  <th className="px-4 py-3 sm:w-1/6 hidden res-user-table:table-cell">
                    Date
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredUser.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gr text-black text-subtitle font-title"
                  >
                    <td className="px-4 py-3 sm:w-1/6">{user.name}</td>
                    <td className="px-4 py-3 sm:w-1/6">{user.lastName}</td>
                    <td className="px-4 py-3 sm:w-1/6 res-user-email:table-cell hidden">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 sm:w-1/6 hidden res-user-table:table-cell">
                      {isoToNormalDate(user.date)}
                    </td>
                    <td className="px-4 py-3 sm:w-1/6">
                      <span className="text-red-500 cursor-pointer font-bold hover:text-red-700">
                        DELETE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUser.length === 0 ? (
              <div className={styles.notFoundContainer}>
                <div className={styles.notFound}>
                  <p>NO USER FOUND WITH THE NAME OR SURNAME ENTERED</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {showAside && (
          <Aside close={() => setShowAside(false)} />
      )}
      {showUserForm && (
        <UserForm close={() => setUserForm(false)}/>
      )}
    </div>
  );
}

export default Users;
