export default (config) => {
    config.headers["Content-Type"] = "application/json";
    if (localStorage.getItem("token"))
        config.headers.token = localStorage.getItem("token");
    return config;
};