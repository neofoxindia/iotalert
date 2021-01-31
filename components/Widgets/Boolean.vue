<template>
    <div v-if="is_false" class="bg-danger h1 m-0 text-center font-weight-bold"> False</div>
    <div v-else class="bg-success h1 m-0 text-center font-weight-bold">True</div>
</template>

<script>
export default {
    props: {
        data: {
            required: true
        }
    },
    name: "Boolean",
    computed: {
        is_false() {
            return ['0', 'false', 'null', 'nil', 'undefined'].includes(this.data.payload.toLowerCase())
        }
    }
}
</script>

<style scoped>

</style>
