import HttpAxios from "./http-axios.js"
import {Base64} from "js-base64"
import HttpManager from "./http-manager.js"

HttpManager.use(HttpAxios);

const Requester1 = new HttpManager()
    .bindDictate("p", e => {
        return Base64.encode(encodeURI(e));
    })
    .setDictate("p")
    .setBaseUrl("https://miniptapi.innourl.com/Redpacket")
    .addRequests({
        GetUserPlayInfo: "/User/GetUserPlayInfo/{userId}&{brandId}"
    });
// const Requester2 = new HttpManager()
//     .bindDictate("p", e => {
//         return Base64.encode(encodeURI(e));
//     })
//     .setBaseUrl("https://miniptapi.innourl.com/Redpacket")
//     .addRequests({
//         GetUserPlayInfo: "/User/GetUserPlayInfo/{userId:p}&{brandId}",
//         GetUserPlayInfo2: {
//             u: "/User/GetUserPlayInfo/{userId}&{brandId}",
//             d: ":p",
//             a: "haha"
//         },
//         GetUserPlayInfo3: "/User/GetUserPlayInfo",
//         GetUserPlayInfo4: "/User/GetUserPlayInfo/{userId}&{brandId}"
//     });

// module.exports = {
//     Requester1,
//     // Requester2
// };


var asd = Requester1.GetUserPlayInfo({
    params: {
        userId: 2,
        brandId: 1003
    }
}).then(res => {
    console.log(res, '==================1111=============================')
});

console.log(asd, '===================================3333=================================================');