// 브라우저가 현재의 클라이언트 호스트 이름을 얻어오는 방법
const hostname 
    = window && window.location && window.location.hostname;

console.log('현재호스트: ', hostname);

let backendHost; // 백엔드 호스트 이름
if (hostname === 'localhost') {
    backendHost = 'http://localhost:8080';
} else if (hostname === 'http://ec2-13-124-149-19.ap-northeast-2.compute.amazonaws.com/') {
    backendHost = 'http://kiosk-db.c39qlc7zi0zc.ap-northeast-2.rds.amazonaws.com:8080';
}

export const API_BASE_URL = `${backendHost}`;