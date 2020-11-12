import axios from 'axios';
import { BASE_API_URL } from '../../../util/config';

const sendGetRequest = async (path, onErrorValue = []) => {
  try {
    const res = await axios.get(BASE_API_URL + path, {withCredentials: true});
    return res.data.result;
  } catch(e) {
    return onErrorValue;
  }
};

const sendPostRequest = async (path, data, onErrorValue = null) => {
  try {
    const res = await axios.post(BASE_API_URL + path, data, {withCredentials: true});
    return res.data;
  } catch(e) {
    return onErrorValue;
  }
};

const sendPutRequest = async (path, data, onErrorValue = null) => {
  try {
    const res = await axios.put(BASE_API_URL + path, data, {withCredentials: true});
    return res.data;
  } catch(e) {
    return onErrorValue;
  }
};

const sendDeleteRequest = async (path, onErrorValue = null) => {
  try {
    const res = await axios.delete(BASE_API_URL + path, {withCredentials: true});
    return res.data;
  } catch(e) {
    return onErrorValue;
  }
};

const sendImagePostRequest = async (path, form) => {
  try {
      const res = await axios.post(BASE_API_URL + path, form, {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
      });
      return res.data;
  } catch (e) {
      return [];
  }
};

export { sendGetRequest, sendPostRequest, sendPutRequest, sendDeleteRequest, sendImagePostRequest };
