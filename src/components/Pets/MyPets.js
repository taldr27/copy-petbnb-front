import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalService from '../Modal/ModalService';
import AddPet from './AddPet';
import ModalRoot from '../Modal/ModalRoot';
import Pet from './Pet';
import { fetchPets } from '../../redux/thunks/petThunks';

const MyPets = () => {
  const dispatch = useDispatch();
  const myPets = useSelector((state) => state.pets.data);

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  const openModalAddPet = () => {
    ModalService.open(AddPet);
  };

  return (
    <div className="my-pets">
      <button onClick={openModalAddPet} type="button" className="btn btn-primary m-4">New Pet</button>
      <h1>My Pets</h1>
      <ul className="container-xl d-flex flex-wrap justify-content-center gap-2">
        { myPets.length
          ? myPets.map((pet) => (
            <Pet key={pet.id} pet={pet} />
          ))
          : <p>You have no pets</p>}
      </ul>
      <ModalRoot />
    </div>
  );
};

export default MyPets;
