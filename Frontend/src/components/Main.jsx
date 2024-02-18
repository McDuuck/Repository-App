import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AppBar from './AppBar';
import MyReviews from './MyReviews';
import CreateReview from './CreateReview';
import RepositoryDetails from './RepositoryDetails';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, } from 'react-router-native';
import { UserProvider } from '../contexts/UserContext';
import React from 'react';
import { SortingContext } from './SortingContext';
import { useState } from 'react';


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
  
});

const Main = () => {
  const [selectedOption, setSelectedOption] = useState('Latest repositories');

  return (
    <UserProvider>
      <SortingContext.Provider value={{ selectedOption, setSelectedOption }}>
        <View style={styles.container}>
          <AppBar />
            <Routes>
              <Route path="/Repositories" element={<RepositoryList />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/CreateReview" element={<CreateReview />} />
              <Route path="/MyReviews" element={<MyReviews />} />
              <Route path="/RepositoryDetails/:id" element={<RepositoryDetails />} />
              <Route path='/SignUp' element={<SignUp />} />
            </Routes>
        </View>
      </SortingContext.Provider>
    </UserProvider>
  );
}

export default Main;