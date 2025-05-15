 
import axios from 'axios';
import { message as messageLib } from 'antd';


const host = window.localStorage.getItem('host') || '/api';

export async function requestData(method: string, params: Record<string, any>) {

  const res = await axios({
    url: host,
    method: 'post',
    data: {
      method,
      data: params
    },
    responseType: 'json'
  });
  const { data, success, message } = res.data;
  if (false === success) {
    messageLib.error(message);
    throw new Error(message);
  } else {
    messageLib.success('success');
    return data;
  }

}
