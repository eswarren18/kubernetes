import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 },   // ramp up to 50 VUs
    { duration: '30s', target: 100 },  // ramp up to 100 VUs
    { duration: '30s', target: 200 },  // ramp up to 200 VUs
    { duration: '30s', target: 0 },    // ramp down to 0 VUs
  ]
};

export default function () {
  http.get('http://localhost:8000/api/todos');
  sleep(1);
}
