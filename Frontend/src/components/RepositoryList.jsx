import React, { useContext } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { useNavigate } from 'react-router-native';
import DisplayImage from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import SortingList from './SortingList';
import { SortingContext } from './SortingContext';
import { Searchbar } from 'react-native-paper';
import { gql, useQuery } from '@apollo/client';

const SEARCH_REPOSITORIES = gql`
    query repositories($searchKeyword: String!) {
        repositories(searchKeyword: $searchKeyword) {
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

const styles = StyleSheet.create({
    separator: {
        height: 10,
        flexDirection: 'row',
    },
    container: {
        flex: 1,
    },
    menuButton: {
        padding: 10,
        color: theme.colors.textPrimary,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItem: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export const ItemSeparator = ({ data }) =>
    <View style={styles.separator}>
        <Text>{data}</Text>
    </View>;

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
    const onChangeSearch = (query) => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
}

const RepositoryList = () => {
    const { selectedOption } = useContext(SortingContext);
    const navigate = useNavigate();
    const { repositories } = useRepositories();
    const [searchQuery, setSearchQuery] = React.useState("");

    let repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    const handlePress = (id) => {
        navigate(`/RepositoryDetails/${id}`);
    };

    const filter = (selectedOption, searchQuery) => {
        let filteredNodes = repositoryNodes;

        if (searchQuery) {
            filteredNodes = filteredNodes.filter(node =>
                node.fullName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedOption === "Latest repositories") {
            return filteredNodes.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
        } else if (selectedOption === "Highest rated repositories") {
            return filteredNodes.sort((a, b) => {
                return b.ratingAverage - a.ratingAverage;
            });
        } else if (selectedOption === "Lowest rated repositories") {
            return filteredNodes.sort((a, b) => {
                return a.ratingAverage - b.ratingAverage;
            });
        }
        return filteredNodes;
    }

    repositoryNodes = filter(selectedOption, searchQuery);

    return (
        <View style={styles.container}>
            <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                ListHeaderComponent={SortingList}
                renderItem={({ item }) =>        
                    <TouchableOpacity onPress={() => handlePress(item.id)}>
                        <View testID={`repository-${item.id}`}>
                            <DisplayImage ownerAvatarUrl={item.ownerAvatarUrl}
                                fullName={item.fullName}
                                description={item.description}
                                language={item.language}
                                forksCount={item.forksCount}
                                stargazersCount={item.stargazersCount}
                                reviewCount={item.reviewCount}
                                ratingAverage={item.ratingAverage}
                            />
                        </View>
                    </TouchableOpacity>
                }
            />
        </View>
    );
}

export default RepositoryList;
