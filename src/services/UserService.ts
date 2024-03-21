import React from "react";
import axios from "axios";
import { User } from "../types";
import authHeader from "./AuthHeader";

export default class UserService {
  private apiUrl: string = `${process.env.REACT_APP_API_URL}/user`;

  async getUser(id: number): Promise<User | null> {
    const user = localStorage.getItem('user');
    try {
      const response = await axios.get<User>(`${this.apiUrl}/${id}`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

 getAvatarUrl = async (userId: number) => {

  // const avatar = localStorage.getItem('avatar');

  // if (avatar) {
  //   return avatar;
  // } else {
    try {
      const response = await axios.get(`${this.apiUrl}/avatar/${userId}`, {
        headers: authHeader(),
        responseType: 'arraybuffer'
      });
  
      const blob = new Blob([response.data], {type: 'image/jpeg'});
      const avatarUrl = URL.createObjectURL(blob);
      // localStorage.setItem('avatar', avatarUrl);
      return avatarUrl;
    } catch (error) {
      console.error('Error getting avatar:', error);
      throw error;
    }
  // }
  
 } 

 uploadAvatar = async (file: File, userId: number) => {
  const formData = new FormData();
  formData.append('avatar', file);

  try {
    await axios.post(`${this.apiUrl}/avatar/${userId}`, formData,  {
      headers: authHeader(true),
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }

 }

}
