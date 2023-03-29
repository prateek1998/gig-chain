import React,{useState} from "react";
import { giggerHeader } from "../../constants/allocation";
import { assignUsersToGig } from "../../services/apiCalls";
import Notify from '../react-toast';

const GiggerSelectionTable = ({userData, gigData, filteredUser, handleSelected}) => {
    const [selectGig, setSelectGig] = useState(filteredUser);

    const handleChecked = (data) => {
      if (selectGig.find((e) => e.giggerId === data.giggerId)) {
        return true;
      } 
      return false;
    };
  
    const handleChange = (e, data) => {
      if (selectGig.find((e) => e.giggerId === data.giggerId)) {
        setSelectGig(selectGig.filter((item) => item.giggerId !== data.giggerId));
      } else {
        setSelectGig((prevVal) => [...prevVal, data]);
      }
    }

    const handleSubmit = () => {
      if(selectGig.length <= 0){
        Notify('Error', "Giggers not selected");
        return
      }
      if(selectGig.length > 5) {
        Notify('Error', "You cannot select more than 5 users");
        return
      }
      assignUsersToGig(gigData.gigId, selectGig).then(
        (gigs) => {
          if (gigs.success) {
            Notify('Success', '👋 Gigger assign successfully');
            handleSelected();
          }
        },
        (error) => {
          console.log(error);
          Notify('Error', 'Gigger assign failed');
        }
      );
    }
    return(
        <React.Fragment>
          {userData && userData.length
          ?
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {
                  giggerHeader.map((item, index) => (
                    <th scope="col" key={index} className="px-6 py-3">
                      {item}
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                userData.map((user, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {user.giggerId}
                    </td>
                    <td className="px-6 py-4 ">
                      {user.name}
                    </td> 
                    <td className="px-6 py-4 ">
                      <div className="flex items-center">
                          <input 
                            id="checkbox" 
                            type="checkbox" 
                            value={user.giggerId}
                            checked={handleChecked(user)}
                            onChange={(e) => handleChange(e, user)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:border-gray-600" 
                          />
                          <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                    </td>                 
                  </tr>
                ))
              }
            </tbody>
          </table>
          : <p className='text-sm text-center mt-5'>No Gigger found</p>
        }  
          <div className="flex items-center justify-around px-6 py-2 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="staticModal" type="button" onClick={() => setSelectGig([])} className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 ">Reset</button>
                <button data-modal-hide="staticModal" type="button" onClick={() => handleSubmit()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Submit</button>
            </div>
        </React.Fragment>
    )
}

export default GiggerSelectionTable;