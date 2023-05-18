import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Dimensions, TextInput, StyleSheet, Text, View, Alert } from 'react-native';

import { roleService } from '../services/role.service';

export default function EditRole(){    

    const route = useRoute(); // o route é usado para receber informações de outra tela

    const navigation = useNavigation<any>();    
    
    navigation.setOptions({
        headerRight: () => <Button title="Home" onPress={() => navigation.navigate('Home')}></Button>        
    });
    
    let id = null;

    const [name, setName] = React.useState(''); //o '' especifica que o tipo é string   
    const [description, setDescription] = React.useState(''); //o '' especifica que o tipo é string   
    
    const [verificaId, setVerificaId] = React.useState('');

    async function fetchRoles() {
        //setRefreshing(true); // inicia a ampulheta do carregamento
        try {
            if(route.params){
                const {roleId} = route.params as any;
                id = roleId;               
                //alert('ID: '+id);
                  roleService.get(id).then((retorno) => {
                     //alert('Role: '+retorno.name);
                     setName(retorno.name),
                     setDescription(retorno.description),
                     setVerificaId(roleId)
                  });
            } 
        } catch (error) {
            navigation.goBack();
        }       
        //alert(verificaId);
    }

    React.useEffect(() => {
        //userService.getList().then(list => setUsers(list))
        //.catch(error => navigation.goBack());
        fetchRoles();        
    },[]);

    async function save() {
        if (!name || name.trim() === '') {
           alert('Nome é obrigatório!');
        
        } else if (!description || description.trim() === '') {
            alert('Descrição é obrigatória!');   
        } else {            
            if(verificaId !== ""){
                //alert('alterar');
                await roleService.update({ name, description, id:verificaId });
                navigation.goBack();
            }
            else{
                //alert('inserir novo');
                await roleService.create({ name, description });
                navigation.goBack();
            }                    
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Nome </Text>
            <TextInput  style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Descricao</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} />   
            
            <view style={styles.button}>
                <Button title ='Salvar' onPress={save}/>
            </view>
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

