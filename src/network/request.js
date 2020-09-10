import originAxios from 'axios'

// export default function axios(option) {
//   return new Promise((resolve, reject) => {
//     // 1.创建axios的实例
//     const instance = originAxios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     });

//     // 2. axios的拦截器
//     // 2.1 请求拦截的作用
//     instance.interceptors.request.use(config => {
//       return config
//     }, err => {
//       return err
//     })

//     // 2.2 响应拦截作用


//   })
// }

export function request(config) {
  // 1.创建axios的实例
  const instance = originAxios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })

  // 2. axios的拦截器
  // 2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2 响应拦截作用
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  // 3.发送真正的网络请求
  return instance(config)

}