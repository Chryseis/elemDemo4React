/**
 * Created by AllenFeng on 2017/10/16.
 */
import fetch from './fetch';
import {resCode} from '../../constants/resCode';


const request = async(url, options) => {
    let res = await fetch(url, options);
    let json = await res.json();
    if (json.errno === resCode.OK) {
        return json.data
    }
}

export default request;