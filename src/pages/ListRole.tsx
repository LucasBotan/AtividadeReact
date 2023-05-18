import { Alert, Button, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { roleService } from '../services/role.service';


export default function EditRole(){

    const [refreshing, setRefreshing] = React.useState(false); // para chamar o refresh de tela
    const [roles, setRoles] = React.useState<any[]>([]);

    const navigation = useNavigation<any>();

    /*
    navigation.setOptions({
        headerRight: () => <Button title="Home" onPress={() => navigation.navigate('Home')}></Button>        
    });
    */
    
    
    
    React.useEffect(() => {        
        fetchRoles();        
    },[]);

    async function fetchRoles() {
        setRefreshing(true); // inicia a ampulheta do carregamento
        try {
            const list = await roleService.getList();
            setRoles(list);    
        } catch (error) {
            navigation.goBack();
        }
        setRefreshing(false); // depois de carregado para o carregamento
    }

    function goEditRole(role: any){
        //alert("alterar id " + role.id);   
       // navigation.navigate('User', {user: user}); // pode fazer assim tbm, assim passa todos os campos
       navigation.navigate('EditRole', {roleId: role.id});  //passa o id lá para a tela de EditRole
    }

    async function deleteRole(role: any){
        await roleService.delete(role.id); 
        /*
        Alert.alert(
            'Deseja deletar?', 'ATENÇÃO',
            [              
              {text: 'Yes', onPress: () => console.log('Yes button is clicked')},
              {text: 'No', onPress: () => console.log('OK button clicked')},
            ],
            { 
              cancelable: false 
            }
          );        
          */             
    }

    return (
        <View style={styles.container}>
            <View style={styles.alternativeLayoutButtonContainer}>                
                <Button onPress={() => navigation.navigate('EditRole')} title="Add Role" />   
                <Button onPress={() => fetchRoles()} title="Refresh" color="#90ee90" />
            </View>
            <View >
                <Text style={styles.text}>Lista de Roles</Text>
            </View>
            <FlatList
                onRefresh={fetchRoles} // metodo para atualizar a tela
                refreshing={refreshing} // chama o refresh para parara a ampulheta do carregamento
                data={roles} // roles vem do services role.service
                renderItem={({item}) => 
                    <View style={styles.itemView}>
                        <Text onPress={() => goEditRole(item)}>{item.name} - {item.description}</Text> 
                        <Button onPress={() => deleteRole(item)} title="Delete" color="#f08080"/>  
                    </View>
                }
            />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemView:{
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#708090',
        backgroundColor: '#c0c0c0',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 3,
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 1,
    },
    text:{
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    alternativeLayoutButtonContainer: {
        margin: 10,
        width: Dimensions.get('screen').width - 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }    
  });
  