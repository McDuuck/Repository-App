import { gql, useQuery } from '@apollo/client';

const MY_QUERY = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;

const useRepositories = () => {
  const { loading, error, data, refetch } = useQuery(MY_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const repositories = data.repositories;

  return { repositories, loading, refetch };
};

export default useRepositories;