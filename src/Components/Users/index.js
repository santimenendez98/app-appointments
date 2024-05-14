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

function Users() {
  const user = useSelector((state) => state.user.data);
  const isPending = useSelector((state) => state.user.pending);
  const [showAside, setShowAside] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  function isoToNormalDate(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${day}-${month}-${year}`;
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
              placeholder={"Filter with name, last name or ID"}
            />
            <button className="w-20 py-2 rounded bg-blue-600 text-white font-bold text-sm hover:bg-blue-700">
              User
            </button>
          </div>
          <div className="w-full overflow-x-scroll md:overflow-hidden p-3 bg-white shadow-lg">
            <table className="w-full bg-white border-collapse">
              <thead className=" text-black bg-bg-table font-bold w-full">
                <tr>
                  <th className="px-4 py-3 sm:w-1/6">Name</th>
                  <th className="px-4 py-3 sm:w-1/6 ">Last Name</th>
                  <th className="px-4 py-3 sm:w-1/6">Email</th>
                  <th className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
                    Date
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {user.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gr text-black text-subtitle font-title"
                  >
                    <td className="px-4 py-3 sm:w-1/6">{user.name}</td>
                    <td className="px-4 py-3 sm:w-1/6">{user.lastName}</td>
                    <td className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 sm:w-1/6 hidden res-table:table-cell">
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
          </div>
        </div>
      </div>
      {showAside && (
        <div className="absolute top-0 left-0">
          <Aside show={showAside} />
        </div>
      )}
    </div>
  );
}

export default Users;
