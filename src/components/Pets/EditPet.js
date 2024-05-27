/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrentUser } from '../../redux/thunks/userThunks';
import { editPet, fetchPets } from '../../redux/thunks/petThunks';
import Modal from '../Modal/Modal';
import ModalBody from '../Modal/ModalBody';
import ModalHeader from '../Modal/ModalHeader';
import ModalFooter from '../Modal/ModalFooter';

const EditPet = (props) => {
  const dispatch = useDispatch();
  const { close, pet } = props;
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

    const petId = pet.id;
    dispatch(editPet({ formData, petId })).then((response) => {
      if (response.error) {
        responseMessage(response.error.message, 'danger');
      } else {
        responseMessage('Pet edited succesfully', 'success');
      }
      close();
      dispatch(fetchPets());
    });
  };

  return (
    <Modal>
      <ModalHeader title="Edit Pet" close={close} />
      <ModalBody>
        <form className="row g-3">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input className="form-control mb-2" id="name" type="text" value={pet.name} placeholder={pet.name} />
            </div>
            <div className="form-group">
              <label htmlFor="pet-type">Type:</label>
              <input className="form-control mb-2" id="pet-type" type="text" value={pet.pet_type} hidden />
            </div>
            <div className="form-group">
              <label htmlFor="date-of-birth">Date of birth:</label>
              <input className="form-control mb-2" id="date-of-birth" type="date" value={pet.date_of_birth} placeholder={pet.date_of_birth} />
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
              <input className="form-control mb-2" id="hair-length" type="text" value={pet.hair_length} placeholder={pet.hair_length} />
            </div>
            <div className="form-group">
              <label htmlFor="extra-information">Extra Information (Optional):</label>
              <input className="form-control mb-2" id="extra-information" type="text" value={pet.extra_information} placeholder={pet.extra_information} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="breed">Breed:</label>
              <input className="form-control mb-2" id="breed" type="text" value={pet.breed} placeholder={pet.breed} />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select className="form-control mb-2" id="gender">
                {['Male', 'Female'].map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="allergies">Allergies (Optional):</label>
              <input className="form-control mb-2" id="allergies" type="text" value={pet.allergies} placeholder={pet.allergies} />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload image (Optional):</label>
              <input className="form-control-file mb-2" id="image" type="file" accept="image/*" />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter buttonName="Confirm" buttonFunc={handleSubmit} close={close} />
    </Modal>
  );
};

EditPet.propTypes = {
  close: PropTypes.func.isRequired,
  pet: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pet_type: PropTypes.string,
    date_of_birth: PropTypes.string,
    size: PropTypes.string,
    breed: PropTypes.string,
    hair_length: PropTypes.string,
    allergies: PropTypes.string,
    extra_information: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default EditPet;
