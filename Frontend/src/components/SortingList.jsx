import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Button } from 'react-native';
import theme from '../theme';
import { SortingContext } from './SortingContext';

const styles = StyleSheet.create({
    separator: {
        height: 10,
        flexDirection: 'row',
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

const SortingList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { selectedOption, setSelectedOption } = useContext(SortingContext);

    return (
        <View>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.buttonText}>Sorted by: {selectedOption}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => {
                            setSelectedOption("Latest repositories");
                            setIsModalVisible(false);
                        }}>
                            <Text style={styles.menuItem}>Latest repositories</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectedOption("Highest rated repositories");
                            setIsModalVisible(false);
                        }}>
                            <Text style={styles.menuItem}>Highest rated repositories</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setSelectedOption("Lowest rated repositories")
                            setIsModalVisible(false)
                        }}>
                            <Text style={styles.menuItem}>Lowest rated repositories</Text>
                        </TouchableOpacity>
                        <Button title="Close" onPress={() => setIsModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default SortingList;
