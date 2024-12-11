import {Client,ID,Account} from 'appwrite'
import envConfig from '../config/envConfig';

export class AppwriteAuth{
  client =new Client();
  account;
 
  constructor(){
    this.client.setEndpoint(envConfig.appwriteUrl).setProject(envConfig.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async signup({name,email,password}){
    try {
      const userAccount= await this.account.create(ID.unique(),email,password,name);
      if(userAccount){
        // console.log("Signed up successfully")
        return await this.login({email,password});
      }
    } catch (error) {
      console.log(error)
    }
    
  }

  async login({email,password}){
    try {
      return await this.account.createEmailSession(email,password);
    } catch (error) {
      console.log(error) 
    }
  }

  async getCurrentUser(){
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }
  async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        console.error(error);
    }
}
}

const appwriteAuth =new AppwriteAuth();

export default appwriteAuth;


