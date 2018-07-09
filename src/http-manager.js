import RequestOption from "./request-option.js";
import Requester from "./requester.js";
import Configure, { Conf } from "./configure.js";

//私有属性名
const [rqots, rqers, in_conf, getRequestItem] = [
    Symbol("requestOptions"),
    Symbol("requesters"),
    Symbol("configure"),
    Symbol("getRequestItem")
];

class HttpManager {
    constructor(baseUrl, requests) {
        this[in_conf] = new Configure();
        this.setBaseUrl(baseUrl).addRequests(requests);
    }

    [getRequestItem](key) {
        this[rqers] || (this[rqers] = {});
        if (key in this[rqots] && !(key in this[rqers])) {
            this[rqers][key] = new Requester(this[rqots][key]);
        }
        return this[rqers] && this[rqers][key];
    }
}

Object.defineProperty(HttpManager.prototype, "addRequests", {
    configurable: false,
    enumerable: false,
    get: function() {
        return function(requests) {
            if (requests) {
                this[rqots] || (this[rqots] = {});
                for (let key in requests) {
                    // this[in_conf]: new Configure()
                    this[rqots][key] = new RequestOption(this[in_conf], requests[key]);
                    console.log('=============================================');
                    console.log(this[rqots][key], '-------------easy-http:39');
                    Object.defineProperty(this, key, {
                        get: function() {
                            console.log(this, '-------------easy-http:40');
                            let item = this[getRequestItem](key);
                            return item && item.handler;
                        }
                    });
                }
            }
            return this;
        }.bind(this);
    }
});

/**
 * 对外配置方法注册为静态和非静态两种方式
 */
const funcs = [
    "setBaseUrl",
    "setHeader",
    "addHeader",
    "bindHandler",
    "bindPreHandler",
    "bindPostHandler",
    "bindDictate",
    "setSerializater",
    "setErrorHandler",
    "setAction",
    "setDictate",
    "setEscape",
    "use"
];

const n = funcs.length;
for (let i = 0; i < n; i++) {
    let key = funcs[i];
    Object.defineProperty(HttpManager, key, {
        configurable: false,
        enumerable: false,
        get: function() {
            return function() {
                Conf[key](...arguments);
                return this;
            }.bind(this);
        }
    });

    Object.defineProperty(HttpManager.prototype, key, {
        configurable: false,
        enumerable: false,
        get: function() {
            return function() {
                this[in_conf][key](...arguments);
                return this;
            }.bind(this);
        }
    });
}
export default HttpManager;
