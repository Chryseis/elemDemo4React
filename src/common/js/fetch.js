/**
 * Created by AllenFeng on 2017/9/13.
 */
import fetch from 'isomorphic-fetch';

export default function request(url, options={}) {
    options = {
        // your default options
        mode:'cors',
        credentials: 'same-origin',
        redirect: 'error',
        ...options,
    };

    if(options.queryParams) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
        delete options.queryParams;
    }

    return fetch(url, options);
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}