import DisplayImage from "./RepositoryItem";
import { ItemSeparator } from "./RepositoryList";
import { FlatList } from "react-native";
import React from "react";


export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
  
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <DisplayImage {...item} />}
        />
    );
    };

export default RepositoryListContainer;