import {View, Image, StyleSheet} from 'react-native';
import Text from './Text';
import theme from '../theme';
import React from 'react';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: 'row', 
        alignItems: 'center',
        backgroundColor: 'white', 
        fontFamily: theme.fonts.main,
        zIndex: 999,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        fontFamily: theme.fonts.main,
        backgroundColor: 'white', 
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    textContainer: {
        flexDirection: 'column',
        paddingLeft: 15,
    },
    boldText: {
        fontWeight: 'bold',
        fontFamily: theme.fonts.main,
    },
    languageText: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        padding: 3,
        borderRadius: 5,
        alignSelf: 'flex-start',
        flexWrap: 'wrap',
        fontFamily: theme.fonts.main,
    },
    counterNumbers: {
        fontWeight: 'bold',
        fontFamily: theme.fonts.main,
    },
    counterContainer: {
        alignItems: 'center',
    },
    description: {
        paddingRight: 40,
    }
});

const Counter = ({number}) => {

    if (number > 1000) {
        return (
            <Text style={styles.counterNumbers}>{(number/1000).toFixed(1)}k</Text>
        );
    }
    else {
        return (
            <Text style={styles.counterNumbers}>{number}</Text>
        );
    }
}

const DisplayImage = (props) => {
    return (
        <View>
            <View style={styles.container} testID={`repository-${props.fullName}`}>
                <Image style={styles.image} source={{uri: props.ownerAvatarUrl}} />
                <View style={styles.textContainer}>
                    <Text style={styles.boldText}>{props.fullName}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                    <Text style={styles.languageText}>{props.language}</Text>
                </View>
            </View>
                <View style={styles.stats}>
                    <View style={styles.counterContainer}>
                        <Counter number={props.stargazersCount}></Counter>
                        <Text>Stars</Text>
                    </View>
                    <View style={styles.counterContainer}>
                        <Counter number={props.forksCount}></Counter>
                        <Text>Forks</Text>
                    </View>
                    <View style={styles.counterContainer}>
                        <Counter number={props.reviewCount}></Counter>
                        <Text>Reviews</Text>
                    </View>
                    <View style={styles.counterContainer}>
                        <Counter number={props.ratingAverage}></Counter>
                        <Text>Rating</Text>
                    </View>
                </View>
            </View>
    );
}

export default DisplayImage;