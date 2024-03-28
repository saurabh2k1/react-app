const getLocalRefreshToken = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        return user?.refreshToken;
    }
}

const getLocalAccessToken = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        return user?.accessToken;
    }
}

const updateLocalAccessToken = (token: string) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        user.accessToken = token;
        localStorage.setItem('user', JSON.stringify(user));
    }
}

const getUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        return JSON.parse(storedUser);
    } else return;
}

const setUser = (user:any) => {
    localStorage.setItem('user', JSON.stringify(user));
}

const removeUser = () => {
    localStorage.removeItem('user');
}

const TokenService = {
    getLocalAccessToken, 
    getLocalRefreshToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
}

export default TokenService;