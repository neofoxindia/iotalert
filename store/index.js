export const state = () => ({
    is_mqtt_connected: false,
    mqtt_web_server_address: 'mqtt.neofox.in',
    mqtt_web_server_port: 443
})


export const mutations = {
    mqtt_offline: (state) => state.is_mqtt_connected = false,
    mqtt_online: (state) => state.is_mqtt_connected = true,
    set_mqtt_address: (state, address) => state.mqtt_web_server_address = address,
    set_mqtt_port: (state, port) => state.mqtt_web_server_port = port,
}


export const actions = {}
