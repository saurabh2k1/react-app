import React from "react";

const authHeader = (isFile: boolean = false) => {
    const token = localStorage.getItem('token');
    
    if (token) {
        const headers: { [key: string]: string} = {
            'x-auth-token': token
        }
        if (isFile) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        return headers;
    } else {
        return { 'x-auth-token': null };
    }
}

export default  authHeader;