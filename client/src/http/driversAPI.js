import { /*$authHost,*/ $host } from "./index";

export const fetchDrivers = async () => {
    const { data } = await $host.get('api/driver');
    return data;
};

export const fetchClients = async () => {
    const { data } = await $host.get('api/client');
    return data;
};

export const fetchOneDriver = async (id) => {
    const { data } = await $host.get('api/driver/' + id);
    return data;
};

export const fetchOneClient = async (id) => {
    const { data } = await $host.get('api/client/' + id);
    return data;
};
export const fetchCars = async () => {
    const { data } = await $host.get('api/car');
    return data;
};
export const deleteDriver = async(id) =>{
    const { data } = await $host.delete('/api/driver/' + id);
    return data
}
export const deleteClient = async(id) =>{
    const { data } = await $host.delete('/api/client/' + id);
    return data
};

export const createOrder = async (Comments, FirstPoint, LastPoint, ClientId, DriverId) => {
    const { data } = await $host.post('api/order', {
        FirstPoint,
        LastPoint,
        Comments,
        ClientId,
        DriverId,
        ManagerId: null,
        OrderStatusId: "3",
        PayId: null,
        CargoId: null
    });
    return data;
};


export const addCar = async (Brand, Model, Payload, BodyType, DriverId) => {
    const { data } = await $host.post('api/car', {
        Brand,
        Model,
        BodyType,
        Payload,
        DriverId
    });
    return data;
};

export const DriverDataChange = async (LastName, FirstName, Patronymic, Email, Password, Birthday, Phone, id) => {
    const { data } = await $host.put('api/driver/' + id, { LastName, FirstName, Patronymic, Email, Password, Birthday, Phone});
    return data;
};

export const ClientDataChange = async (LastName, FirstName, Patronymic, Email, Password, Birthday, Phone, id) => {
    const { data } = await $host.put('api/client/' + id, { LastName, FirstName, Patronymic, Email, Password, Birthday, Phone });
    return data;
};