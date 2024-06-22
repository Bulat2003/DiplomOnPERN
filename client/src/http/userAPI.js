import { $authHost, $host } from "./index";
import {jwtDecode} from 'jwt-decode';

export const registration = async (LastName, FirstName, Patronymic, Email, Password, Phone, Birthday, role) => {
    const { data } = await $host.post('api/user/registration', { LastName, FirstName, Patronymic, Email, Password, Phone, Birthday, role });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async (Email, Password) => {
    try {
        const { data } = await $host.post('api/user/login', { Email, Password });
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        throw error;
    }
};

export const getProfile = async (id) => {
    const { data } = await $authHost.get('api/client/' + id);
    return data;
};
export const getProfileDriver = async (id) => {
    const { data } = await $authHost.get('api/driver/' + id);
    return data;
};
