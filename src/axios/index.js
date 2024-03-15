import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5001/'
});

export const addRule = async (rules) => {
    try {
        const response = await apiClient.post('/addRules', rules);
        return response.data;
    } catch (error) {
        console.error('There was an error adding the condition:', error);
        throw error;
    }
};

export const getRules = async () => {
    try {
        const response = await apiClient.get('/getRules');
        return response.data;
    } catch (error) {
        console.error('There was an error adding the condition:', error);
        throw error;
    }
};

export const editRule = async (updatedItems) => {
    try {
        const response = await apiClient.put('/editRule', updatedItems);
        return response.data;
    } catch (error) {
        console.error('There was an error adding the condition:', error);
        throw error;
    }
};

export const deleteRule = async (rule_id) => {
    try {
        const response = await apiClient.delete(`/deleteRule/${ rule_id }`);
        return response.data;
    } catch (error) {
        console.error('There was an error adding the condition:', error);
        throw error;
    }
};
