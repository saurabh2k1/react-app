

const authHeader = (isFile: boolean = false) => {
    const storedUser = localStorage.getItem('user')
    console.log(storedUser)
    if (storedUser){
        const user = JSON.parse(storedUser);
        if (user.token) {
            const headers: { [key: string]: string} = {
                'x-access-token': user.token
            }
            if (isFile) {
                headers['Content-Type'] = 'multipart/form-data';
            }
            return headers;
        } else {
            return { 'x-access-token': null };
        }
    }
    
}

export default  authHeader;