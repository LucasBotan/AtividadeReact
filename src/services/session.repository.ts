import AsyncStorage from "@react-native-async-storage/async-storage";

class SessionRepository{

    private readonly key = 'Logged_user';

    public async getLoggedUser(){
        const json = await AsyncStorage.getItem(this.key);
        if(json)return JSON.parse(json);
        return null;

        
    }

    public async setLoggedUser(logged: any){
        const json = JSON.stringify(logged);
        AsyncStorage.setItem(this.key, json);
    }

    public async removeLoggedUser(){
        console.log('REMOVE');
        await AsyncStorage.removeItem(this.key);
    }


}

export const session = new SessionRepository();