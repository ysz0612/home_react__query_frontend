import axios from "axios";

export const saleAllGetApi = async () => {
    try{
        const response = await axios.get("http://localhost:3001/sales");
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const saleGetApi = async (id) => {
    try{
        const response = await axios.get(`http://localhost:3001/sales/${id}`);
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const salePostApi = async (dataObj) => {
    try{
        const response = await axios.post(
            "http://localhost:3001/sales",
            dataObj
        );
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const salePutApi = async (dataObj) => {
    try{
        const response = await axios.put(
            `http://localhost:3001/sales/${dataObj.id}`,
            dataObj
        );
        return response.data;
    }
    catch(error){
        return error;
    }
}

export const saleDeleteApi = async (id) => {
    try{
        await axios.delete(`http://localhost:3001/sales/${id}`);
        return id;
    }
    catch(error){
        return error;
    }
}