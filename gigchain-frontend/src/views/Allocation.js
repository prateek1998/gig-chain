import React, { Fragment, useState, useEffect } from 'react';
import { GoLinkExternal } from 'react-icons/go'
import { tableHeader } from '../constants/Allocation';
import MyModal from '../components/modal/Modal';
import { getAllGigs, getAllGigUsers } from '../services/ApiCalls'
import GiggerTable from '../components/gigger/GiggerSelectionTable';
import GiggerAssignedTable from '../components/gigger/GiggerAssignedTable';

const Allocation = () => {
  const [tableData, setTableData] = useState(null)
  const [selectedGig, setSelectedGig] = useState({})
  const [userData, setUserData] = useState([]);
  const [isGigAssignOpen, setIsGigAssignOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [filteredUser, setfilteredUser] = useState([])

  function closeAssignModal() {
    setIsGigAssignOpen(false)
  }

  function openAssignModal() {
    setIsGigAssignOpen(true)
  }

  const fetchData = async () => {
    getAllGigs().then(
      (gigs) => {
        if (gigs.success) {
          setTableData(gigs.data)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchUserData = async () => {
    getAllGigUsers().then(
      (gigs) => {
        if (gigs.success) {
          setUserData(gigs.data)
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const openAddUser = () => {
    fetchUserData();
    setIsAddUserOpen(true)
  }
  const closeAddUser = () => {
    setIsAddUserOpen(false);
  }
  
  const handleSelected = () => {
    closeAddUser();
    closeAssignModal();
    fetchData();
  }

  return (
    <Fragment>
      <div className='my-3'>
        <p className='text-2xl mb-3'>
          Allocate Gigs to Giggers
        </p>
        <p className='text-blue-500'>
          1023 unallocated Open Gigs in the system
        </p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {
            tableData ?
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                        <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                      </div>
                    </th>
                    {
                      tableHeader.map((item, index) => (
                        <th scope="col" key={index} className="px-6 py-3">
                          {item}
                        </th>
                      ))
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    tableData.length && tableData.map((item, index) => (
                      <tr key={index} className="bg-white border-b hover:bg-gray-50">
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input id="checkbox-table-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                            <label htmlFor="checkbox-table-2" className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.gigId}
                        </th>
                        <td className="px-6 py-4">
                          {item.gigType}
                        </td>
                        <td className="px-6 py-4">
                          {item.attendance ? item.attendance : '--'}
                        </td>
                        <td className="px-6 py-4">
                          {item.location ? `lat: ${item.location.lat}, long: ${item.location.long} ` : '--'}
                        </td>
                        <td className="px-6 py-4">
                          <div className='flex items-center'>
                            {item.assigned ? item.assigned.length : 0}
                            <button onClick={() => {
                              setSelectedGig(item);
                              setfilteredUser(item.assigned)
                              openAssignModal()
                            }}>
                              <GoLinkExternal color='blue' />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {item.status ? item.status : '--'}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              : <p className='text-xl'> No Data found</p>
          }
        </div>
      </div>
      <MyModal
        open={isGigAssignOpen}
        closeModal={closeAssignModal}
        mode="add"
        handleAdd={openAddUser}
        title={`Gigger assigned to Gig Id ${selectedGig.gigId}`}
        subTitle={'(Max 5 Giggers can be assigned)'}
      >
        <GiggerAssignedTable
          selectedGig={selectedGig}
          handleSelected={fetchData}
          setfilteredUser={setfilteredUser}
        />
      </MyModal>
      <MyModal
        open={isAddUserOpen}
        closeModal={closeAddUser}
        title={'Assign Gigger'}
        subTitle={'(Max 5 Giggers can be assigned)'}
      >
        <GiggerTable
          userData={userData}
          gigData={selectedGig}
          filteredUser={filteredUser}
          handleSelected={handleSelected}
        />
      </MyModal>

    </Fragment>
  )
}

export default Allocation;
