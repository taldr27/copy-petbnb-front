import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyRooms } from '../../redux/thunks/fetchRooms';
import ModalService from '../Modal/ModalService';
import ModalRoot from '../Modal/ModalRoot';
import AddRoom from './AddRoom';
import deletePetRoom from '../../redux/thunks/deleteRoom';

const MyRooms = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.myRooms.data);
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

  useEffect(() => {
    dispatch(fetchMyRooms());
  }, [dispatch]);

  const openModalAddRoom = () => {
    ModalService.open(AddRoom);
  };

  const responseMessage = (message, status) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${status} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('');

    alertPlaceholder.append(wrapper);
  };

  const deleteRoom = (roomID) => {
    dispatch(deletePetRoom(roomID)).then((response) => {
      if (response.error) {
        responseMessage(response.error.message, 'danger');
      } else {
        responseMessage('Pet deleted!', 'success');
        dispatch(fetchMyRooms());

        setTimeout(() => {
          alertPlaceholder.innerHTML = '';
        }, 2000);
      }
    });
  };

  const renderedRooms = data.map((d) => (

    <div key={d.attributes.id} className="card mb-3 col-sm-5 col-11">
      <div className="row g-0">
        <div className="col-md-6">
          <img src={d.attributes.image_url} alt="room-img" className="img-fluid rounded-start room-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="col-md-6 ps-1">
          <div className="card-body">
            <h5 className="card-title">{d.attributes.name}</h5>
            <div className="card-text">
              <p className="mb-1">
                <strong>Price:</strong>
                {' '}
                {d.attributes.price}
              </p>
              <p className="mb-1">
                <strong>Pet type:</strong>
                {' '}
                {d.attributes.type_of_pet}
              </p>
              <p className="mb-1">
                <strong>Pet size:</strong>
                {' '}
                {d.attributes.max_size_accepted}
              </p>
              <p className="mb-1">
                <small className="text-muted">
                  <strong>Rating:</strong>
                  {' '}
                  {d.attributes.rating}
                </small>
              </p>
            </div>
          </div>
          <div className="card-footer text-muted text-center">
            <button onClick={() => deleteRoom(d.id)} type="button" className="btn btn-danger m-2">Delete</button>
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <div>
      <button onClick={openModalAddRoom} type="button" className="btn btn-primary m-4">Add room</button>
      <h2>My Rooms</h2>
      <div className="d-flex flex-wrap justify-content-around p-2">{renderedRooms}</div>
      <ModalRoot />
    </div>
  );
};

export default MyRooms;
