/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchCurrentUser } from '../../redux/thunks/userThunks';
import { createPet, fetchPets } from '../../redux/thunks/petThunks';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import ModalFooter from '../Modal/ModalFooter';

const AddPet = (props) => {
  const { close } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.data);
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const responseMessage = (message, status, duration = 2000) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${status} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('');

    alertPlaceholder.appendChild(wrapper);

    setTimeout(() => {
      wrapper.remove();
    }, duration);
  };

  const handleSubmit = () => {
    const name = document.getElementById('name').value;
    const typeOfPet = document.getElementById('pet-type').value;
    const dateOfBirth = document.getElementById('date-of-birth').value;
    const size = document.getElementById('pet-size').value;
    const breed = document.getElementById('breed').value;
    const gender = document.getElementById('gender').value;
    const hairLength = document.getElementById('hair-length').value;
    const allergies = document.getElementById('allergies').value;
    const extraInformation = document.getElementById('extra-information').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('pet[name]', name);
    formData.append('pet[pet_type]', typeOfPet);
    formData.append('pet[date_of_birth]', dateOfBirth);
    formData.append('pet[size]', size);
    formData.append('pet[breed]', breed);
    formData.append('pet[gender]', gender);
    formData.append('pet[hair_length]', hairLength);
    formData.append('pet[allergies]', allergies);
    formData.append('pet[extra_information]', extraInformation);
    formData.append('pet[user_id]', currentUser.id);

    if (image) {
      formData.append('pet[image]', image);
    }

    dispatch(createPet(formData)).then((response) => {
      if (response.error) {
        responseMessage(response.error.message, 'danger');
      } else {
        responseMessage('Pet created succesfully', 'success');
        dispatch(fetchPets());
      }
      close();
      if (window.location.pathname === '/my-pets') {
        navigate('/my-pets');
      } else {
        document.getElementById('make-reservation-button').click();
      }
    });
  };

  return (
    <Modal>
      <ModalHeader title="Add Pet" close={close} />
      <ModalBody>
        <form className="row g-3">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input className="form-control mb-2" id="name" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="pet-type">Type:</label>
              <select className="form-control mb-2" id="pet-type">
                <option disabled selected>Select type</option>
                {['dog', 'cat'].map((petType) => (
                  <option key={petType} value={petType}>
                    {petType}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date-of-birth">Date of birth:</label>
              <input className="form-control mb-2" id="date-of-birth" type="date" />
            </div>
            <div className="form-group">
              <label htmlFor="pet-size">Size:</label>
              <select className="form-control mb-2" id="pet-size">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="hair-length">Hair Length (Optional):</label>
              <input className="form-control mb-2" id="hair-length" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="extra-information">Extra Information (Optional):</label>
              <input className="form-control mb-2" id="extra-information" type="text" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="breed">Breed:</label>
              <input className="form-control mb-2" id="breed" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select className="form-control mb-2" id="gender">
                {['Male', 'Female'].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="allergies">Allergies (Optional):</label>
              <input className="form-control mb-2" id="allergies" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload image (Optional):</label>
              <input className="form-control-file mb-2" id="image" type="file" accept="image/*" />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter buttonName="Add Pet" buttonFunc={handleSubmit} close={close} />
    </Modal>
  );
};

AddPet.propTypes = {
  close: PropTypes.func.isRequired,
};

export default AddPet;
