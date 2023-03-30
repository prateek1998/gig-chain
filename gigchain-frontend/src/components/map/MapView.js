import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import GoogleMapReact from 'google-map-react';
import { ImLocation2 } from 'react-icons/im';

const AnyReactComponent = ({ text }) => <div><ImLocation2 color="blue" size={"2.5rem"} />{text}</div>;

const MapView = ({ open, closeModal, title, subTitle, gigs }) => {
  const defaultProps = {
    center: {
      lat: 28.7041,
      lng: 77.1025
    },
    zoom: 10
  };

  return (
    <Fragment>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden bg-white p-2 text-left shadow-xl transition-all">
                  <div className='flex justify-between'>
                    <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5" data-modal-hide="defaultModal">
                      <svg aria-hidden="true" className="w-5 h-5 text-black text-3xl" size="2rem" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

                    </button>
                  </div>
                  <div className='mx-16'>

                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      <p className='text-sm mb-4' >{title}</p>
                      {subTitle && <p className='text-xs mb-4 text-blue-400 underline cursor-pointer' >{subTitle}</p>}
                    </Dialog.Title>
                    <div className='flex w-screen ' style={{ height: '80vh' }}>
                      <div className='w-1/5 bg-blue-500 rounded-bl-lg rounded-t-lg ' style={{ height: '80vh' }}>
                        <p className='h-20 bg-blue-800 rounded-t-lg flex text-center text-3xl items-center justify-center text-white '>Delayed Gigs</p>
                        <div>
                          {gigs ? gigs.map(gig => (
                            <>
                              <p className='text-center border hover:bg-blue-700 cursor-pointer py-4 text-white text-bold'>
                                Gig ID {gig.gigId}
                              </p>
                            </>
                          )) :
                            "No Gigs found"
                          }
                        </div>

                      </div >
                      <div className='w-4/6 ml-6 rounded' >
                        <GoogleMapReact
                           bootstrapURLKeys={{ key: process.env.NODE_ENV === 'production' ? process.env.MAP_API : 'map api key' }}
                          defaultCenter={defaultProps.center}
                          defaultZoom={defaultProps.zoom}
                        >
                          {gigs && gigs.map(gig => (
                            <AnyReactComponent
                              lat={gig.lat}
                              lng={gig.long}
                              text={gig.gigId}
                            />
                          ))}
                        </GoogleMapReact>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}


export default MapView;