import React, { useState, useEffect } from 'react';
import { GoLocation } from 'react-icons/go'
import { GoLinkExternal } from 'react-icons/go'
import { Link } from 'react-router-dom';
import MyModal from '../components/modal/modal';
import { getAllGigs } from '../services/apiCalls';
import { tableHeader } from '../constants/tracking';
import GiggerAssignedTrackingTable from '../components/tracking/GiggerAssignedTrackingTable';
import GiggerAllocatedTrackingTable from '../components/tracking/GiggerAllocatedTrackingTable';
import GoogleMapReact from 'google-map-react';

const Tracking = () => {
  const [tableData, setTableData] = useState(null)
  const [isGigAllocatedOpen, setIsGigAllocatedOpen] = useState(false);
  const [isMapViewOpen, setIsMapViewOpen] = useState(false);
  const [isGigAssignOpen, setIsGigAssignOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState({})

  function closeAllocatedModal() {
    setIsGigAllocatedOpen(false)
  }

  function openAllocatedModal() {
    setIsGigAllocatedOpen(true)
  }

  function closeAssignedModal() {
    setIsGigAssignOpen(false)
  }

  function openAssignedModal() {
    setIsGigAssignOpen(true)
  }

  function openMapViewModal() {
    setIsMapViewOpen(true);
  }
  function closeMapViewModal() {
    setIsMapViewOpen(false);
  }

  useEffect(() => {
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

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className='flex my-3 items-center'>
        <p className='text-2xl font-medium mr-5 '>
          Track Gigs to Completion
        </p>
        <button onClick={()=>openMapViewModal()} className={`flex items-center border-gray-300 hover:text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm py-4 px-8 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none border dark:focus:ring-blue-800 text-white bg-blue-700 `}>
          <div>
            <GoLocation />
          </div>
          View Map
        </button>
      </div>
      <p className='text-blue-500'>
        1023 unallocated Open Gigs in the system
      </p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {
          tableData ?
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                  tableData.length && tableData.map(item => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <input id="checkbox-table-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label htmlFor="checkbox-table-2" className="sr-only">checkbox</label>
                        </div>
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.gigId}
                      </th>
                      <td className="px-6 py-4">
                        {item.gigType}
                      </td>
                      <td className="px-6 py-4">
                        {item.gigAttendance ? item.gigAttendance : '--'}
                      </td>
                      <td className="px-6 py-4 underline">
                        <Link to="#">
                          Directory Link
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className='flex items-center'>
                          {item.assigned.length ? item.assigned.length : 0}
                          <button onClick={() => {
                            setSelectedGig(item);
                            openAllocatedModal()
                          }}>
                            <GoLinkExternal color='blue' />
                          </button>

                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className='flex items-center'>
                          {item.assigned.length ? item.assigned.length : 0}
                          <button onClick={() => {
                            setSelectedGig(item);
                            openAssignedModal()
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
      <MyModal
        open={isGigAllocatedOpen}
        closeModal={closeAllocatedModal}
        mode="add"
        handleAdd={() => { console.log("handle Add") }}
        title={`Gigger assigned to Gig Id ${selectedGig.gigId}`}
        subTitle={'(Max 5 Giggers can be assigned)'}
      >
        <GiggerAllocatedTrackingTable
          selectedGig={selectedGig}
        />
      </MyModal>

      <MyModal
        open={isGigAssignOpen}
        closeModal={closeAssignedModal}
        title={`Gigger assigned to Gig Id ${selectedGig.gigId}`}
        subTitle={'(Max 5 Giggers can be assigned)'}
      >
        <GiggerAssignedTrackingTable
          selectedGig={selectedGig}
        />
      </MyModal>

      <MyModal
        open={isGigAllocatedOpen}
        closeModal={closeAllocatedModal}
        mode="add"
        handleAdd={() => { console.log("handle Add") }}
        title={`Gigger assigned to Gig Id ${selectedGig.gigId}`}
        subTitle={'(Max 5 Giggers can be assigned)'}
      >
        <GiggerAllocatedTrackingTable
          selectedGig={selectedGig}
        />
      </MyModal>

      
      
      <MyModal
        open={isMapViewOpen}
        closeModal={closeMapViewModal}
        title={`Map View`}
      >
        <h2>hello </h2>
      </MyModal>

    </React.Fragment>
  )
}

export default Tracking