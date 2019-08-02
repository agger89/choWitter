// 배포용 url과 개발용 url
const backUrl = process.env.NODE_ENV === 'production' ? 'http://api.chostar.info' : 'http://localhost:3065';

export { backUrl };