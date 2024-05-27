import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import { fetchRoomId } from '../../redux/thunks/fetchRooms';
import CalculateRating from '../../utils/CalculateRating';
import ModalRoot from '../Modal/ModalRoot';
import ModalService from '../Modal/ModalService';
import MakeReservation from '../Reservations/MakeReservation';

import './PetRooms.css';

const ShowRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const room = useSelector((state) => state.petRooms.data);
  useEffect(() => {
    dispatch(fetchRoomId(id));
  }, [dispatch, id]);

  let makeResProps = {};
  if (!room.isLoading) {
    makeResProps = {
      roomId: room.id,
    };
  }
  const openModalMakeReservation = () => {
    ModalService.open(MakeReservation, makeResProps);
  };

  return (
    <div>
      <div id="liveAlertPlaceholder" />
      <div className="row justify-content-center">
        <div className="col-md-8 border rounded p-4 mt-4">
          <div className="row">
            <div className="col-md-6">
              <img src={room.image_url} alt="room-img" className="img-fluid rounded" style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="col-md-6 p-3">
              <h2>{room.name}</h2>
              <h4 className="text-muted">
                Room ID:
                {room.id}
              </h4>
              <p>
                Type of pet living here:
                {room.type_of_pet}
              </p>
              <p>
                Max size accepted:
                {room.max_size_accepted}
              </p>
              <p>
                User Owner:
                {room.user_id}
              </p>
              <div>
                <p>Rating:</p>
                <ReactStars
                  count={5}
                  size={24}
                  edit={false}
                  value={room.rating ? CalculateRating(room.rating) : null}
                  activeColor="#ffd700"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-3">
            <button id="make-reservation-button" onClick={openModalMakeReservation} type="button" className="btn btn-primary">Make Reservation</button>
          </div>
        </div>
      </div>
      <ModalRoot />
    </div>
  );
};

export default ShowRoom;
