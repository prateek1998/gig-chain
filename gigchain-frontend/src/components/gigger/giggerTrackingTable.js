import React from "react";
import { AiFillEdit } from 'react-icons/ai';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { assignedGiggerHeader } from "../../constants/tracking";

const GiggerTrackingTable = ({ selectedGig }) => {
  // const [selectedGig.assigned, setassignedUser] = useState(selectedGig.assigned)
  return (
    <React.Fragment>
      {selectedGig.assigned.length
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
              selectedGig.assigned.map((user, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {user.giggerId}
                  </td>
                  <td className="px-6 py-4 flex items-center">
                    {user.name}
                    <button>
                      <AiFillEdit />
                    </button>
                  </td>
                  <td className="px-6 py-4 ">
                    Assigned
                  </td>
                  <td className="px-6 py-4 items-center underline">
                    <button>
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
    </React.Fragment>
  )
}

export default GiggerTrackingTable;