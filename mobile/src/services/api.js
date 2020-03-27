import axios from 'axios';
import Constants from 'expo-constants';

const { manifest } = Constants;

export default axios.create({
    baseURL: `http://192.168.1.102:2500` //usar IpV4
})