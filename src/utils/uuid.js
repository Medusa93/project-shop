import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
  const uuid_token = localStorage.getItem('uuid_token')
  // 如果本地没有uuid_token
  if(!uuid_token) {
    // 生成临时游客身份
    const uuid_token = uuidv4()
    localStorage.setItem('uuid_token',uuid_token) 
  }
  // 切记有返回值 没有返回值undefined
  return uuid_token
}