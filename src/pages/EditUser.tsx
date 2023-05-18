import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Dimensions, TextInput, StyleSheet, Text, View, Alert } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";

import { userService } from '../services/user.service';
import { roleService } from '../services/role.service';

export default function EditUser(){

    const route = useRoute(); // o route é usado para receber informações de outra tela

    const navigation = useNavigation<any>();    

    let id = null;
        
    /*
    if(route.params){
        const {userId} = route.params as any;
        id = userId;
       // alert('ID: '+id);
          userService.get(id).then((retorno) => {
             alert('User: '+retorno.name);
             //name = retorno.name;
          });
    }
    */
   
    


    /*
    if(route.params){
        const {userId} = route.params as any;
        id = userId;
       // alert('ID: '+id); 
       //roleService.getList().then(list => setPapeis(list)).catch(error => navigation.goBack());
       roleService.getList().then(list => setPapeis(list)).catch(error => navigation.goBack());
          userService.get(id).then((retorno) => {
             alert('User: '+retorno.name);
             //name = retorno.name;
          });
    }
    */
    
    

    const [name, setName] = React.useState(''); //o '' especifica que o tipo é string   
    const [username, setUsername] = React.useState(''); //o '' especifica que o tipo é string
    const [password, setPassword] = React.useState('');
    const [confirmPass, setConfirmPass] = React.useState('');
    const [roles, setRoles] = React.useState([]);    
    const [verificaId, setVerificaId] = React.useState('');

    const [papeis, setPapeis] = React.useState([]);  

    const [open, setOpen] = React.useState(false);      



    /*
    async function fetchRoles() {
        try {
            const list = await roleService.getList();
            setPapeis(list);    
            alert(papeis);
        } catch (error) {

        }       
        
    }
    */

    async function fetchUsers() {
        //setRefreshing(true); // inicia a ampulheta do carregamento
        try {
            if(route.params){
                const {userId} = route.params as any;
                id = userId;               
                //alert('ID: '+id);
                  userService.get(id).then((retorno) => {
                     //alert('User: '+retorno.name);
                     setName(retorno.name),
                     setUsername(retorno.username),
                     setVerificaId(userId)
                  });
            }
        } catch (error) {
            navigation.goBack();
        }
        //alert(verificaId);
       // setRefreshing(false); // depois de carregado para o carregamento
    }

    React.useEffect(() => {
        roleService.getList().then(list => setPapeis(list)).catch(error => navigation.goBack());
       // roleService.getList().then(list => setPapeis(list)).catch(error => navigation.goBack());
       // alert(papeis);
        fetchUsers(); 
        //fetchRoles();       
    },[]);   
    
    async function save() {
        if (!name || name.trim() === '') {
            alert('Nome é obrigatório!');
        
        } else if (!username || username.trim() === '') {
            alert('Login é obrigatório!');
        
        } else if (!password || password.trim() === '' || password !== confirmPass) {
            alert('Senha não confere!');
        
        } else {           
            if(verificaId !== ""){
               // alert('alterar');
               // alert(roles);
                //alert(values);
                await userService.update({ name, username, password, roles, id:verificaId });
                navigation.goBack();
            }
            else{
               // alert('inserir novo');
               // alert(roles);
                await userService.create({ name, username, password, roles });
                navigation.goBack();
            }                    
        }
    }

    async function addRole() {
        setRoles(roles)
    }

    
    

    return(
        <View style={styles.container}>
            <Text style={styles.label}>Nome </Text>
            <TextInput  style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Login:</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} editable={id !== ""} />

            <Text style={styles.label}>Role:</Text>
            
                
                <DropDownPicker style={styles.dropdown}
                    multiple={true}
                    open={open}
                    value={roles}
                    items={papeis.map((role:any) => ({ label: role.name, value: role.name }))}
                    setOpen={setOpen}
                    setValue={setRoles}
                    //setItems={setItems} 
                    //onChangeValue={(roles) => {
                    //  {setRoles};
                        //alert(roles);

                    //}}
                // onSelectItem={(roles) => {setRoles}}                
                />
           
            <Text style={styles.label}>Senha:</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

            <Text style={styles.label}>Confirmar Senha:</Text>
            <TextInput style={styles.input} onChangeText={setConfirmPass} secureTextEntry />
           
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
    },
    dropdown: {
        width: Dimensions.get('screen').width - 80,
        height: 30,        
        borderWidth: 1,
        borderRadius: 4,
       // position: 'absolute',
        backgroundColor: '#fff',
        //top: 50,
      },     
});

