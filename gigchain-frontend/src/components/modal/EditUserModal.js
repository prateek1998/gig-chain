import React from "react";
import Notify from "../toaster/ReactToast";
import { updateUserDetails } from "../../services/ApiCalls";

const EditUserModal = ({ userData, setUserData, closeModal, handleUpdate }) => {
 
  const handleChange = (e) => {
    let { id, value } = e.target;
    setUserData({ ...userData, [id]: value })
  }

  const handleSubmit = () => {
    updateUserDetails(userData).then(
      (gigs) => {
        if (gigs.success) {
          Notify('Success', '👋 Gigger updated successfully');
          closeModal();
          handleUpdate(userData);
        }
      },
      (error) => {
        console.log(error);
        Notify('Error', 'Gigger updation failed');
      }
    );
  }
  return (
    <React.Fragment>
      <form>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gigger Id</label>
          <input type="text" id="email" value={userData.giggerId} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giigger Name</label>
          <input type="name" id="name" value={userData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="flex items-center justify-around px-6 py-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button data-modal-hide="staticModal" type="button" onClick={() => closeModal()} className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 ">Back</button>
          <button data-modal-hide="staticModal" type="button" onClick={() => handleSubmit()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
        </div>
      </form>


    </React.Fragment>
  )
}

export default EditUserModal;
