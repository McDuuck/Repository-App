import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext.js';

const useAuthStorage = () => {
    return useContext(AuthStorageContext);
};

export default useAuthStorage;