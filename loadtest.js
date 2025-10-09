import http from 'k6/http';
import { sleep } from 'k6';
export let options = { vus: 100, duration: '60s' };
export default function () {
  http.get('http://localhost:8000/api/todos');
  sleep(1);
}
