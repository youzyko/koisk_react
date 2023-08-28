// 브라우저가 현재의 클라이언트 호스트 이름을 얻어오는 방법
const hostname 
    = window && window.location && window.location.hostname;

console.log('현재호스트: ', hostname);

let backendHost; // 백엔드 호스트 이름
if (hostname === 'localhost') {
    backendHost = 'http://localhost:8080';
} else if (hostname === 'http://13.124.149.19/') {
    backendHost = 'http://13.124.149.19/:8080';
}

export const API_BASE_URL = `${backendHost}`;