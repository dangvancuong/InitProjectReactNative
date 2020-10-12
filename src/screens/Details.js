import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';

export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.getParam('id'),
            data: [],
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Detail',
            headerRight: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('detail', {setForm: 'insert'})}>
                    <Icon name="plus" size={20} style={{marginRight: 15, color: 'black'}}/>
                </TouchableOpacity>
            )
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = () => {
        return fetch('http://jpc.asia/api/infos/' + this.state.id, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })

            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({
                    data: responseJson.item,
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    deleteInfo = () => {
        return fetch('http://jpc.asia/api/infos/' + this.state.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((resJson) => {
            Alert.alert('Delete Success')
            this.props.navigation.dispatch(this.props.navigation.goBack())
        })
        .catch((error) => {
            console.error(error)
        })
    }

    render() {
        const {data} = this.state;
        const {navigation} = this.props;

        return(
            <View style={styles.container}>
                <View style={styles.detailContainer}>
                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{data.name}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{data.email}</Text>
                    </View>

                    <View style={styles.itemContainer}>
                        <Text style={styles.item}>{data.phone}</Text>
                    </View>
                </View>

                <View style={styles.handlerContainer}>
                    <View style={{flex: 1, marginRight: 5}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Edit', {id: data.id})}
                            style={styles.button}>
                            <Text style={styles.buttonFont}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, marginLeft: 5}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this.deleteInfo}
                            style={styles.button}>
                            <Text style={styles.buttonFont}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    detailContainer: {
        margin: 15,
        backgroundColor: '#ddd',
        borderRadius: 3
    },
    itemContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    item: {
        fontSize: 18,
    },
    handlerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: '#2b9806',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 3
    },
    buttonFont: {
        fontSize: 15,
        color: 'black'
    }
});
