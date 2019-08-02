// 배포용 url과 개발용 url
const backUrl = process.env.NODE_ENV === 'production' ? 'http://api.starcho.com' : 'http://localhost:3065';

export { backUrl };