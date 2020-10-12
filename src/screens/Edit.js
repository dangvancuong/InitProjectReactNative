import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';

export default class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.navigation.getParam('id'),
            name: '',
            email: '',
            phone: ''
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Update'
        }
    }

    componentDidMount() {
        return fetch('http://jpc.asia/api/infos/' + this.state.id)
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson)
                this.setState({
                    name: resJson.item.name,
                    email: resJson.item.email,
                    phone: resJson.item.phone
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    update = () => {
        const {id, name, email, phone} = this.state;
        return fetch('http://jpc.asia/api/infos/' + this.state.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone
            })
        })
        .then((response) => response.json())
        .then((resJson) => {
            Alert.alert('delete ')
            this.props.navigation.dispatch(this.props.navigation.navigate('Home'))
        })
        .catch((error) => {
            console.error(error)
        })
    }

    render() {
        const {name, email, phone} = this.state;

        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            onChangeText={(name) => this.setState({name})}
                            autoFocus={true}
                            autoCapitalize="words"
                            value={name}
                            style={styles.formInput} />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            onChangeText={(email) => this.setState({email})}
                            value={email}
                            autoCapitalize="none"
                            style={styles.formInput} />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            onChangeText={(phone) => this.setState({phone})}
                            value={phone}
                            keyboardType="number-pad"
                            style={styles.formInput} />
                    </View>

                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this.update}
                            style={styles.button}>
                            <Text style={styles.buttonFont}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },
    formGroup: {
        marginBottom: 15
    },
    label: {
        marginBottom: 5,
        fontSize: 15
    },
    formInput: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 3,
        fontSize: 20
    },
    inputBirth: {
        fontSize: 20,
        color: 'black'
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
