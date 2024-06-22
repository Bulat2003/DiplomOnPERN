import { $host } from "./index";

export const fetchOrderById = async (orderId) => {
    try {
        const response = await $host.get(`/api/order/${orderId}`);
        if (response.status !== 200) {
            throw new Error('Ошибка при загрузке заказа');
        }
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении заказа:', error);
        throw error;
    }
};

export const fetchOrdersByClientId = async (clientId) => {
    try {
        const response = await $host.get(`/api/order/client/${clientId}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении заказов клиента:', error);
        throw error;
    }
};

export const fetchOrdersByDriverId = async (driverId) => {
    try {
        const response = await $host.get(`/api/order/driver/${driverId}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении заказов клиента:', error);
        throw error;
    }
};

export const fetchAllOrderStatuses = async () => {
    try {
        const response = await $host.get(`/api/orderstatus`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении всех статусов заказов:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, newStatusId) => {
    try {
        const response = await $host.put(`/api/order/${orderId}`, { OrderStatusId: newStatusId });
        if (response.status !== 200) {
            throw new Error('Ошибка при обновлении статуса заказа');
        }
        return response.data;
    } catch (error) {
        console.error('Ошибка при обновлении статуса заказа:', error);
        throw error;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await $host.delete(`/api/order/${orderId}`);
        if (response.status !== 200) {
            throw new Error('Ошибка при удалении заказа');
        }
        return response.data;
    } catch (error) {
        console.error('Ошибка при удалении заказа:', error);
        throw error;
    }
};
