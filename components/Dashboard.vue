<template>
    <section>
        <div>
            <!--         ------------ Error ---------          ----->
            <div class="bg-warning error-card" v-if="show_error">
                <div class="card-header font-weight-bold bg-danger">
                    Error :: {{ mqtt_web_server_address }}: {{ mqtt_web_server_port }}
                </div>
                <div class="card-body">
                    <h4 class="font-weight-bold ">{{ error_message }}</h4>
                </div>
            </div>
        </div>

        <!--         ------------ Tags ---------          ----->
        <div class="container p-3">
            <div class="row">
                <h3>Topic To Subscribe</h3>
                <b-form-tags id="tags-pills" v-model="tags"
                             tag-variant="warning" tag-pills size="lg" separator=" "></b-form-tags>
            </div>
        </div>
        <!--         ------------ Board ---------          ----->

        <div class="container-fluid">
            <div class="row">
                <div v-for="item in data" class="col-auto">
                    <div class="card m-2">
                        <div class="card-header h4 bg-danger d-flex align-items-center px-2 p-1">
                            {{ item.topic }}
                            <b-dropdown right class="ml-3 p-0" no-caret variant="link">
                                <template #button-content>
                                    <BIconThreeDots font-scale="1" variant="dark"></BIconThreeDots>
                                </template>
                                <b-dropdown-item @click="bool_list.push(item.topic)">Boolean</b-dropdown-item>
                                <b-dropdown-item @click="chart_list.push(item.topic)">Chart</b-dropdown-item>
                                <b-dropdown-item @click="speed_list.push(item.topic)">Speed</b-dropdown-item>
                            </b-dropdown>

                        </div>
                        <div class="card-body p-0 m-0">
                            <Boolean v-if="bool_list.includes(item.topic)" :data="item"></Boolean>
                            <Charts :key="storage[item.topic].slice(-1)[0].timestamp"
                                    v-else-if="chart_list.includes(item.topic)"
                                    :data="storage[item.topic]" class="p-2 bg-warning"
                                    style="width:700px"></Charts>
                            <SpeedMeter v-else-if="speed_list.includes(item.topic)"
                                        style="width:200px"
                                        class="bg-warning p-2"
                                        :store="storage[item.topic]"></SpeedMeter>
                            <div class="display-4 bg-warning m-0 font-weight-bold" v-else>{{ item.payload }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
const mqtt = require('mqtt');
import {mapMutations, mapState} from 'vuex';
import Boolean from "~/components/Widgets/Boolean";
import Charts from "~/components/Widgets/Charts";
import SpeedMeter from "~/components/Widgets/SpeedMeter";
import {BIconThreeDots} from 'bootstrap-vue';

let encoder = new TextDecoder("utf-8");
export default {
    name: "Dashboard",
    components: {Boolean, Charts, SpeedMeter, BIconThreeDots},
    data: () => ({
        storage: {},
        client: undefined,
        error_message: "",
        show_error: false,
        tags: [],
        backup_tags: [],
        data: {},
        bool_list: [],
        chart_list: [],
        speed_list: []
    }),
    mounted() {
        this.connect();
    },
    methods: {
        ...mapMutations(['mqtt_online', 'mqtt_offline']),
        connect() {
            this.show_error = false;
            try {
                this.client.end();
            } catch (e) {
            }
            this.client = mqtt.connect(
                "wss://" + this.mqtt_web_server_address,
                {port: this.mqtt_web_server_port});

            this.client.on('connect', () => this.mqtt_online());

            this.client.on('error', (error) => {
                this.mqtt_offline();
                this.error_message = " Error :: " + error;
                this.show_error = true;
                this.client.end();
            });

            this.client.stream.on('error', (error) => {
                this.mqtt_offline();
                this.error_message = " Url is not valid ::ERR_NAME_NOT_RESOLVED";
                this.show_error = true;
                this.client.end();
            });

            this.client.on("message", (topic, payload) => this.messages(topic, encoder.decode(payload)));
        },
        subscribe() {
            if (this.backup_tags.length !== 0) this.client.unsubscribe(this.backup_tags);
            this.client.subscribe(this.tags);
        },
        messages(topic, payload) {
            const timestamp = Date.now();
            this.$set(this.data, topic, {payload, topic});
            if (this.storage[topic] === undefined) this.storage[topic] = [];
            else if (this.storage[topic].length > 10) this.storage[topic] = this.storage[topic].slice(1);
            if (this.storage[topic].slice(-1)[0] !== payload) this.storage[topic].push({payload, timestamp});
        }
    },
    computed: {
        ...mapState(['mqtt_web_server_address', 'mqtt_web_server_port', 'is_mqtt_connected'])
    },
    watch: {
        mqtt_web_server_address() {
            this.connect();
        },
        mqtt_web_server_port() {
            this.connect();
        },
        tags() {
            console.log(this.tags);
            this.subscribe();
            this.backup_tags = this.tags;
        }
    }
}
</script>

<style scoped>

</style>
