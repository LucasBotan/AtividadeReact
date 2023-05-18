import { Alert, Button, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { userService } from '../services/user.service';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default function Home() {

    const [refreshing, setRefreshing] = React.useState(false); // para chamar o refresh de tela
    const [users, setUsers] = React.useState<any[]>([]);

    const navigation = useNavigation<any>();

    navigation.setOptions({
        //headerLeft: () => <></>
        headerLeft: () => <Button title="Exit" onPress={() => navigation.goBack()}></Button>,
        headerRight: () => <Button title="Add User" onPress={() => navigation.navigate('EditUser')}></Button>,
        
    });

    //userService.getList().then(list => setUsers(list)); //nunca executar assim, pq vai entrar em looping
    React.useEffect(() => {
        //userService.getList().then(list => setUsers(list))
        //.catch(error => navigation.goBack());
        fetchUsers();        
    },[]);

    async function fetchUsers() {
        setRefreshing(true); // inicia a ampulheta do carregamento
        try {
            const list = await userService.getList();
            setUsers(list);    
        } catch (error) {
            navigation.goBack();
        }
        setRefreshing(false); // depois de carregado para o carregamento
    }

    function goEditUser(user: any){
        //alert('Vamos editar!');
       // navigation.navigate('User', {user: user}); // pode fazer assim tbm, assim passa todos os campos
       navigation.navigate('EditUser', {userId: user.id});  //passa o id lá para a tela de EditUser
    }

    async function deleteUser(user: any){
        await userService.delete(user.id); 
       //alert("deletar id " + user.id);      
    }

    /*
     <TouchableOpacity onPress={() => navigation.navigate('EditRole')}>
                <Text>
                    Go to Role
                </Text>
            </TouchableOpacity>


    <TouchableOpacity style={styles.button} onPress={() => deleteUser(item)}>
                            <Text>
                                Del
                            </Text>
                        </TouchableOpacity>

    <Button onPress={() => navigation.navigate('ListRole')} title="List Roles" />
    */
    return (
        <View style={styles.container}>           
            <View style={styles.alternativeLayoutButtonContainer}>
                <Button onPress={() => navigation.navigate('ListRole')} title="List Role | Add Roles" />                            
                <Button onPress={() => fetchUsers()} title="Refresh" color="#90ee90" />
            </View>
            <View >
                <Text style={styles.text}>Lista de Usuarios</Text>
            </View>
            <FlatList
                onRefresh={fetchUsers} // metodo para atualizar a tela
                refreshing={refreshing} // chama o refresh para parara a ampulheta do carregamento
                data={users} // user vem do services user.service
                renderItem={({item}) => 
                    <View style={styles.itemView}>
                        <Text onPress={() => goEditUser(item)}>{item.name} - {item.username} - {item.roles}</Text>
                        <Button onPress={() => deleteUser(item)} title="Delete" color="#f08080"/>
                        
                    </View>
                }
            />

        </View>
    );
}

/*
<View style={styles.button}>
    <Button title ='Del' onPress={() => deleteUser(item)}/>
</View>
*/

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