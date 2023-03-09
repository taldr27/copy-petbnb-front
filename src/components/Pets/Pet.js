import React from 'react';
import propTypes from 'prop-types';

function Pet({ pet }) {
  // const dispatch = useDispatch();

  return (
    <li className="card mb-3 text-start" style={{ 'max-width': '400px' }}>
      <div className="row g-0">
        <div className="col-md-5">
          <img src={pet.image} className="img-fluid rounded-start bg-grey" alt="..." />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title">
              {pet.name}
            </h5>
            <div className="card-text d-flex gap-3">
              <p>breed</p>
              <p>{pet.breed}</p>
            </div>
            <div className="card-text d-flex gap-3">
              <p>date of birth</p>
              <p>{pet.date_of_birth}</p>
            </div>
          </div>
          <div className="card-footer text-muted text-center">
            <a href="/" className="text-decoration-none">
              Edit
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Pet;

Pet.propTypes = {
  pet: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    date_of_birth: propTypes.string.isRequired,
    breed: propTypes.string.isRequired,
  }).isRequired,
};
