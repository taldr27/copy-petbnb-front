import { configureStore } from '@reduxjs/toolkit';
import petReducer from './slices/petSlice';
import petsReducer from './slices/petsSlice';
import petRoomsReducer from './slices/petRoomsSlice';
import checkStatusReducer from './slices/navLoginSlice';
import myRoomsReducer from './slices/myRoomsSlice';
import petRoomReducer from './slices/petRoomSlice';
import userReducer from './slices/userSlice';
import reservationsReducer from './slices/reservationsSlice';
import createReservationReducer from './slices/createReservationSlice';
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    createReservation: createReservationReducer,
    pet: petReducer,
    pets: petsReducer,
    petRooms: petRoomsReducer,
    checkStatus: checkStatusReducer,
    myRooms: myRoomsReducer,
    petRoom: petRoomReducer,
    reservations: reservationsReducer,
    user: userReducer,
    users: usersReducer,
    auth: authReducer,
  },
});

export default store;
