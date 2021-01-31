<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 700 130"
        class="graph" id="svg35">
        <g class="labels x-labels">
            <polyline fill="none" stroke="#0074d9" stroke-width="4" :points="generateData()"/>
            <text v-for="(item, index) in data" :x="70*index" y="120">{{ item.payload }}</text>
        </g>
    </svg>


</template>

<script>
export default {
    name: "Charts",
    props: {
        data: Array
    },
    methods: {
        generateData() {
            let points = "";
            let x = 0;
            let data_points = this.data.map(x => x.payload).map(x => parseInt(x) || 1);
            const max_value = Math.max(...data_points) / 90;
            for (let i in data_points) {
                points += `${x}, ${100 - (data_points[i] / max_value)} `;
                x += 70;
            }
            return points;
        }
    }
}
</script>
