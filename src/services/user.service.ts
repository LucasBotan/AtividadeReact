import { session } from "./session.repository";

class UserService{

    private readonly baseUrl = 'http://192.168.1.106:3000/users';
    
    public async getList(): Promise<any>{
        //const token = 'ABC123';
        const logged = await session.getLoggedUser();

        if(!logged){
            throw new Error("Sessão expirada!");
            
        }

        const response = await fetch(this.baseUrl, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            }
         });

         if(response.status === 200){
            const users = await response.json();
            console.log('User list:', users);
            return users;
         }else if(response.status === 401){
            throw new Error(await response.json());
         }

         return [];         
    }

    public async get(userId: number) {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(`${this.baseUrl}/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            }
        });

        if (response.status === 200) {
            return await response.json();

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }
        return null;
    }

    public async create(user: any) {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            },
            body: JSON.stringify(user)
        });

        if (response.status === 201) {
            return await response.json();

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }
        return null;
    }

    public async update(user: any) {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(`${this.baseUrl}/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            },
            body: JSON.stringify(user)
        });

        if (response.status === 200) {
            return await response.json();

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }
        return null;
    }

    public async delete(userId: number) {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(`${this.baseUrl}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            }
        });

        if (response.status === 200) {
            return await response.json(); //retorna um boolean

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }
        return false;
    }

}

export const userService = new UserService();