import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { Button, Dimensions, TextInput, StyleSheet, Text, View, Alert} from 'react-native';

import{ authService} from '../services/auth.service';

export default function Login(){

    const [username, setUsername] = React.useState(''); //o '' especifica que o tipo é string
    const [password, setPassword] = React.useState('');

    const navigation = useNavigation<any>();

    async function signIn(){
        const logged = await authService.login(username, password);
        if(logged && logged.token){
            //Alert.alert('Usuário logado com sucesso!');
            navigation.navigate('Home');
        }
        else{
           // Alert.alert('Login/senha inválidos!'); // NO MOBILE
           alert('Login/senha inválidos!'); // ASSIM É APENAS PARA RODAR NO WEB
        }
    }


    return(
        <View style={styles.container}>
            <Text style={styles.label}>Login </Text>
            <TextInput  style={styles.input} onChangeText={setUsername}/>

            <Text style={styles.label}>Senha </Text>
            <TextInput style={styles.input}  onChangeText={setPassword} secureTextEntry/>

            
            <View style={styles.button}>
                <Button title ='Entrar' onPress={signIn}/>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
    },
    label:{
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5,
    },
    input:{
        width: Dimensions.get('screen').width - 80,
        height: 40,        
        borderWidth: 1,
        borderRadius: 4,
    },
    button:{
        marginTop:40,        
        width: Dimensions.get('screen').width - 80
    }
});

