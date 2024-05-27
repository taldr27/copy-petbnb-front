import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import ModalFooter from '../Modal/ModalFooter';
import addRoomThunk from '../../redux/thunks/addRoomThunk';
import { fetchMyRooms } from '../../redux/thunks/fetchRooms';

const AddRoom = ({ close }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [typeOfPet, setTypeOfPet] = useState([]);
  const [maxSize, setMaxSize] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

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

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('pet_room[name]', name);
    formData.append('pet_room[price]', price);
    formData.append('pet_room[type_of_pet]', typeOfPet);
    formData.append('pet_room[max_size_accepted]', maxSize);

    if (image) {
      formData.append('pet[image]', image);
    }

    dispatch(addRoomThunk(formData)).then((response) => {
      if (response.error) {
        responseMessage(response.error.message, 'danger');
      } else {
        responseMessage('Room created succesfully', 'success');
        dispatch(fetchMyRooms());

        setTimeout(() => {
          alertPlaceholder.innerHTML = '';
        }, 2000);
      }
    });
  };

  const checkBoxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTypeOfPet([...typeOfPet, value]);
    } else {
      setTypeOfPet(typeOfPet.filter((e) => e !== value));
    }
  };

  return (
    <Modal>
      <ModalHeader title="Add new room" close={close} />
      <ModalBody>
        <p className="mb-1">Room name:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="mb-1">Price:</p>
        <input
          className="mb-2"
          type="number"
          step="5"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <p className="m-0">Type of pet:</p>
        <div onChange={checkBoxChange}>
          <input type="checkbox" value="dog" name="typeOfPet" />
          Dog
          <input type="checkbox" value="cat" name="typeOfPet" className="ms-2 mb-2" />
          Cat
        </div>
        <p className="mb-0">Max pet size accepted:</p>
        <div className="mb-2" onChange={(e) => setMaxSize(e.target.value)}>
          <input type="radio" value="small" name="max_size_accepted" />
          Small
          <input className="ms-2" type="radio" value="medium" name="max_size_accepted" />
          Medium
          <input type="radio" value="large" name="max_size_accepted" className="ms-2" />
          Large
        </div>
        <div>
          <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} />
        </div>
      </ModalBody>
      <ModalFooter buttonName="Add room" buttonFunc={handleSubmit} close={close} />
    </Modal>
  );
};

export default AddRoom;

AddRoom.propTypes = {
  close: PropTypes.func.isRequired,
};
