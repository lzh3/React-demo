import axios from "axios"
import jsonp from "jsonp"
export const reqLogin=(userdata)=>axios.post("/login",userdata);

/*获取天气数据*/
export const reqWeather=(city)=>{
    return new Promise((res,rej)=>{
        jsonp("https://www.tianqiapi.com/api?version=v1&city="+city+"&appid=75917967&appsecret=6MChK1T5",
            {},
            function(err,data){
                res(data)
            }
        )
    })
}

//添加分类
export const addKinds=(data)=>{
    return axios.post("/kinds/add",data)
}

//获取分类
export const getKinds=(id)=>{
    return axios.get("/kinds/getkinds",{
        params:{
            num:id
        }
    })
}

//存储二级分类
export const storeChildKinds=(data)=>{
    return axios.post("/kinds/storechild",data)
}
//修改标题
export const updateKindsTitle=(data)=>{
    return axios.post("/kinds/update",data)
}
//删除
export const delTitle=(data)=>{
    return axios.post("/kinds/del",data)
}


