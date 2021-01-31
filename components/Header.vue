<template>
    <!--suppress HtmlUnknownBooleanAttribute -->
    <b-navbar toggleable type="dark" class="shadow-sm bg-secondary">
        <b-navbar-brand href="#" class="p-0 m-0">
            <img src="@/assets/img/logo.png" style="width:50px" alt="">
        </b-navbar-brand>
        <div class="row d-flex align-items-center ml-auto">
            <div class="col-auto mt-2 d-md-block d-none">
                <h5 class="font-weight-bold">wss://{{ address }}</h5>
            </div>
            <div class="col-auto p-0 m-0 mr-5">
                <div class="spinner">
                    <div class="double-bounce1" :class="connect_class"></div>
                    <div class="double-bounce2" :class="connect_class"></div>
                </div>
            </div>
        </div>
        <b-navbar-toggle target="sidebar-toggler" class="border-0">
            <BIconInfo font-scale="2" variant="primary"></BIconInfo>
        </b-navbar-toggle>

        <b-navbar-toggle target="navbar-toggle-setting-collapse" class="border-0">
            <BIconBraces font-scale="1.5" variant="primary"></BIconBraces>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-setting-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <div class="row d-flex mt-4">
                    <div class="col-lg-4 col-md-10 col-12">
                        <div class="row d-flex justify-content-center font-weight-bold">
                            <b-form-group label="Broker Address" class="col-12">
                                <b-input-group prepend="wss://">
                                    <b-form-input v-model="address" class="bg-primary" required
                                                  placeholder="server address"></b-form-input>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Broker Port" class="col-12">
                                <b-input-group prepend="port">
                                    <b-form-input v-model="port" class="bg-primary" required
                                                  placeholder="Port"></b-form-input>
                                </b-input-group>
                            </b-form-group>
                            <b-button @click="set_mqtt_address(address);set_mqtt_port(port)"
                                      class="col-5 m-2 font-weight-bold"
                                      variant="primary">
                                Save
                            </b-button>
                            <b-button @click="reset" class="col-5 m-2 font-weight-bold" variant="danger">
                                Reset
                            </b-button>
                        </div>
                    </div>
                </div>
            </b-navbar-nav>
        </b-collapse>

    </b-navbar>
</template>


<script>
import {mapMutations, mapState} from 'vuex';
import {BIconBraces, BIconInfo} from 'bootstrap-vue';

export default {
    name: "Header",
    components: {BIconInfo, BIconBraces},
    data: () => ({
        address: 'mqtt.neofox.in',
        port: 443
    }),
    computed: {
        connect_class() {
            return this.is_mqtt_connected ? 'bg-success' : 'bg-warning';
        },
        ...mapState(['is_mqtt_connected'])
    },
    methods: {
        ...mapMutations(['set_mqtt_address', 'set_mqtt_port']),
        reset() {
            this.address = 'mqtt.neofox.in';
            this.port = 443;
        }
    }
}
</script>

<style scoped>

input {
    font-size: 1.5em;
}

</style>
