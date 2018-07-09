import axios from "axios";

const Handlers = {
    get(o) {
        console.log(o, '===========-------====');
        return axios
            .get(o.url)
            .then(function(response) {
                console.log(response, '---------123');
                return Promise.resolve(response);
            })
            .catch(function(error) {
                console.log(error, '---------123456');
                return Promise.reject(error);
            });
    },

    post(o) {
        axios
            .post(o.url)
            .then(function(response) {
                return Promise.resolve(response);
            })
            .catch(function(error) {
                return Promise.reject(error);
            });
    }
};

export default {
    install(host) {
        console.log(host);
        host.bindHandler(o => {
            let act = (o.action || "").toLowerCase();
            if (Handlers[act]) {
                Handlers[act](o);
            } else {
                console.warn(`EasyHttpAxios:not found action '${act}'`, "\n");
            }
        });
    }
};
