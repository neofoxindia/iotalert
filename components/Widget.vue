<template>
    <div class="card">
        <div class="card-header d-flex align-items-center">
            {{ data.topic }}
            <b-dropdown right class="ml-3" no-caret variant="link">
                <template #button-content>
                    <b-icon font-scale="1" icon="three-dots" variant="dark"></b-icon>
                </template>
                <b-dropdown-item>Boolean</b-dropdown-item>
            </b-dropdown>

        </div>
        <div class="card-body">
            {{ data.payload }}
        </div>
    </div>

</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        bools:[]
    }),
    name: "Widget"
}
</script>

<style scoped>
.option {
    cursor: pointer;
}
</style>
