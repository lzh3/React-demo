//操作用户信息

export default {
    saveUser:(user)=>{
        localStorage.setItem("userinfo",JSON.stringify(user))
    },
    getUser:()=>{
        return JSON.parse(localStorage.getItem("userinfo")||'{}')
    },
    delUser:()=>{
        localStorage.removeItem("userinfo")
    }
}