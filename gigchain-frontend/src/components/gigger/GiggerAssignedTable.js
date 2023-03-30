import React, { useState } from "react";
import MyModal from "../modal/Modal";
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { assignedGiggerHeader } from "../../constants/Allocation";
import EditUserModal from "../modal/EditUserModal";
import Notify from "../toaster/ReactToast";
import { assignUsersToGig } from "../../services/ApiCalls";

const GiggerAssignedTable = ({ selectedGig, handleSelected, setfilteredUser }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [assignedUser, setassignedUser] = useState(selectedGig.assigned)
  const [selectedUser, setSelectedUser] = useState(null)
  
  function closeEditModal() {
    setIsEditOpen(false)
  }

  function openEditModal() {
    setIsEditOpen(true)
  }
  const handleDelete = data => {
    let filteredUser = assignedUser.filter(item => item.giggerId !== data.giggerId)
    assignUsersToGig(selectedGig.gigId, filteredUser).then(
      (gigs) => {
        if (gigs.success) {
          Notify('Success', '👋 Gigger removed successfully');
          setassignedUser(filteredUser);
          setfilteredUser(filteredUser)
          handleSelected()
        }
      },
      (error) => {
        console.log(error);
        Notify('Error', 'Gigger assign failed');
      }
    );
  }

  const handleUpdate = (data) => {
    let filteredUser = assignedUser.find(item => item.giggerId === data.giggerId)
    filteredUser.giggerId = data.giggerId;
    filteredUser.name =data.name;
  }


  return (
    <React.Fragment>
      {assignedUser.length
        ?
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {
                assignedGiggerHeader.map((item, index) => (
                  <th scope="col" key={index} className="px-6 py-3">
                    {item}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              assignedUser.map((user, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {user.giggerId}
                  </td>
                  <td className="px-6 py-4 flex items-center">
                    {user.name}
                    <button onClick={() => {
                      setSelectedUser(user)
                      openEditModal()
                    }}>
                      <AiFillEdit />
                    </button>
                  </td>
                  <td className="px-6 py-4 ">
                    Assigned
                  </td>
                  <td className="px-6 py-4 items-center underline">
                    <button onClick={() => {
                      handleDelete(user)
                    }}>
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        : <p className='text-sm text-center mt-5'>No Gigger Assigned</p>
      }
      <MyModal
        open={isEditOpen}
        closeModal={closeEditModal}
        title={`Edit Gigger Details`}
      >
        <EditUserModal
          closeModal={closeEditModal}
          handleUpdate={handleUpdate}
          userData={selectedUser}
          setUserData = {setSelectedUser}
        />
      </MyModal>
    </React.Fragment>
  )
}

export default GiggerAssignedTable;
