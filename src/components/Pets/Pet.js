import React from 'react';
import { useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import ModalService from '../Modal/ModalService';
import EditPet from './EditPet';
import { deletePet, fetchPets } from '../../redux/thunks/petThunks';

const Pet = ({ pet }) => {
  const dispatch = useDispatch();
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

  const openModalEditPet = () => {
    ModalService.open(EditPet, { pet });
  };

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

  const handleDeletePet = () => {
    dispatch(deletePet(pet.id)).then((response) => {
      if (response.error) {
        responseMessage(response.error.message, 'danger');
      } else {
        responseMessage('Pet deleted!', 'success');
        dispatch(fetchPets());
      }
    });
  };

  return (
    <li className="card mb-3 text-startc col-sm-5 col-12">
      <div className="row g-0" style={{ minHeight: '215px', height: '100%' }}>
        <div className="col-md-5" style={{ minHeight: '215px', maxHeight: '215px', overflow: 'hidden' }}>
          <img src={pet.image_url} className="img-fluid rounded-start" alt="Pet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">
              {pet.name}
            </h5>
            <div className="card-text d-flex gap-3">
              <p>Breed:</p>
              <p>{pet.breed}</p>
            </div>
            <div className="card-text d-flex gap-3">
              <p>Date of Birth:</p>
              <p>{pet.date_of_birth}</p>
            </div>
          </div>
          <div className="card-footer text-muted text-center">
            <button onClick={openModalEditPet} type="button" className="btn btn-primary m-2">Edit Pet</button>
            <button onClick={handleDeletePet} type="button" className="btn btn-danger m-2">Delete</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Pet;

Pet.propTypes = {
  pet: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    image_url: propTypes.string.isRequired,
    date_of_birth: propTypes.string.isRequired,
    breed: propTypes.string.isRequired,
  }).isRequired,
};
