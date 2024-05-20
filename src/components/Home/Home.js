import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { fetchRooms } from '../../redux/thunks/fetchRooms';
import { fetchUsers } from '../../redux/thunks/userThunks';
import CalculateRating from '../../utils/CalculateRating';
import petroomImage from '../../images/petroom.jpg';
import RenderedRooms from './RenderedRooms';
import RoomFilters from './Filter';
import SearchBar from './SearchBar';
import './home.css';

const AllRooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.petRooms.data);
  const users = useSelector((state) => state.users.data);

  const [typeOfPetFilter, setTypeOfPetFilter] = useState('');
  const [sizeOfPetFilter, setSizeOfPetFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const hash = {};
  users.map((user) => Object.assign(hash, { [user.id]: user.name }));

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await dispatch(fetchRooms());
      await dispatch(fetchUsers());
      setLoading(false);
    };
    loadData();
  }, [dispatch]);

  let carouselRooms = [];
  if (Array.isArray(rooms)) {
    carouselRooms = rooms.filter(
      (room) => CalculateRating(room.attributes.rating) >= 4,
    );
  }
  let renderedRooms = [];
  if (Array.isArray(rooms)) {
    renderedRooms = carouselRooms.map((room) => (
      <Carousel.Item key={room.id}>
        <div className="row">
          <div className="col-sm-6 bg-carousel">
            <img src={petroomImage} alt="room-img" className="img-fluid" />
          </div>
          <div className="col-sm-6 bg-carousel d-flex flex-column justify-content-center p-5">
            <h2>{room.attributes.name}</h2>
            <p className="mb-2">{`Type of pet living here: ${room.attributes.type_of_pet}`}</p>
            <p className="mb-2">{`Max size accepted: ${room.attributes.max_size_accepted}`}</p>
            <p className="mb-2">{`Owner Name: ${hash[room.attributes.user_id]}`}</p>
            <span>
              <ReactStars
                count={5}
                size={24}
                edit={false}
                value={room.attributes.rating ? CalculateRating(room.attributes.rating) : null}
                activeColor="#ffd700"
              />
            </span>
            <p className="mb-2">{`Price: $${room.attributes.price}`}</p>
          </div>
        </div>
      </Carousel.Item>
    ));
  }

  let filteredRooms = rooms;
  if (typeOfPetFilter) {
    filteredRooms = filteredRooms.filter(
      (room) => room.attributes.type_of_pet.includes(typeOfPetFilter),
    );
  }

  if (sizeOfPetFilter) {
    filteredRooms = filteredRooms.filter(
      (room) => room.attributes.max_size_accepted === sizeOfPetFilter,
    );
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  if (Array.isArray(rooms)) {
    filteredRooms = filteredRooms.filter(
      (room) => room.attributes.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  return (
    <div className="d-flex flex-column align-items-center">
      {loading ? (
        <div className="loader">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <h1 className="text-center">Best rated rooms!</h1>
          <Carousel className="w-75">{renderedRooms}</Carousel>
          <div className="d-flex flex-column">
            <div className="row align-items-center m-3 justify-content-center">
              <SearchBar onChange={handleSearch} />
              <RoomFilters
                typeOfPetFilter={typeOfPetFilter}
                setTypeOfPetFilter={setTypeOfPetFilter}
                sizeOfPetFilter={sizeOfPetFilter}
                setSizeOfPetFilter={setSizeOfPetFilter}
              />
            </div>
            <div className="container-xl p-2">
              <RenderedRooms rooms={filteredRooms} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllRooms;
