let client;

export function setClient(newClient) {
  client = newClient;
}

const reqMethods = [
  'request', 'delete', 'get', 'head', 'options', 
  'post', 'put', 'patch'
];

let service = {};

reqMethods.forEach((method) => {
  service[method] = function () {
    if (!client) throw new Error("Client not installed");
    return client[method].apply(null, arguments);
  }
});

export default service;