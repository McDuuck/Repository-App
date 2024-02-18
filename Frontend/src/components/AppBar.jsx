import React, { useState, useEffect, useContext } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from './Text';
import theme from '../theme';
import { UserContext } from '../contexts/UserContext';

const GET_AUTHORIZED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;

const AppBar = () => {
  const client = useApolloClient();
  const [refresh, setRefresh] = useState(false);
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.me) {
      setUserIsLoggedIn(data.me);
    } else {
      setUserIsLoggedIn(null);
    }
  }, [data, refetch]);
  

  useEffect(() => {

  }, [userIsLoggedIn, refresh]);

  const clearStore = async () => {
    await refetch();
    navigate('/SignIn');
    setUserIsLoggedIn(null);
  
    await AsyncStorage.clear();
  
  
    await client.resetStore();
  
    setRefresh(!refresh);
  };

  return (
    <Pressable style={theme.barContainer}>
      <ScrollView horizontal>
        {loading ? (
          <Text>Loading...</Text>
        ) : userIsLoggedIn === undefined ? (
          <Text>Loading...</Text>
        ) : userIsLoggedIn === null ? (
          <>
          <Link to="/SignIn">
            <Text style={theme.barTest}>Sign In</Text>
          </Link>
          <Link to="/SignUp">
            <Text style={theme.barTest}>Sign Up</Text>
          </Link>
          </>
        ) : (
          <>
            <Link to="/Repositories">
              <Text style={theme.barTest}>Repositories</Text>
            </Link>
            <Link to="/CreateReview">
              <Text style={theme.barTest}>Create a review</Text>
            </Link>
            <Link to="/MyReviews">
              <Text style={theme.barTest}>My reviews</Text>
            </Link>
            <Pressable onPress={clearStore}>
              <Text style={theme.barTest}>Sign out</Text>
            </Pressable>
          </>
        )}
        <Text>{userIsLoggedIn?.username || ''}</Text>
      </ScrollView>
    </Pressable>
  );
};

export default AppBar;
