import { gql, useMutation, useApolloClient } from '@apollo/client';
import useAuthStorage from './useAuthStorage';

const SIGN_IN = gql`
    mutation authenticate($credentials: AuthenticateInput!) {
        authenticate(credentials: $credentials) {
            accessToken
        }
    }
`;

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const authStorage = useAuthStorage();
    const client = useApolloClient();
  
    const signIn = async ({ username, password }) => {
        try {
            const { data } = await mutate({ variables: { credentials: { username, password } } });
            const user = data?.authenticate;
    
            if (user && user.accessToken) {
                await authStorage.setAccessToken(user.accessToken);
                const token = await authStorage.getAccessToken();
                
                await client.resetStore();    
            }
    
            return user;
        } catch (error) {
            console.error('Sign-in error:', error.message);
            throw error;
        }
    };
    
  
    return [signIn, result];
  };

export default useSignIn;