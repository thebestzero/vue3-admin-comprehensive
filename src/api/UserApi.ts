import request from '@/utils/request'

type UserInfo = {
  username:string;
  password:string
}
class UserApi{
    static api:UserApi = new  UserApi()
    login(userInfo:UserInfo) {
        return request.post('/sys/login', false,userInfo);
    }
    getUserInfo(){
      return request.get('/sys/profile')
    }
}

export default UserApi.api
