<template>
    <main>
        <Header></Header>
        <Sidebar></Sidebar>
        <Nuxt/>
    </main>

</template>


<script>
import Header from "~/components/Header";
import Sidebar from "~/components/Sidebar";

export default {
    components: {
        Header, Sidebar
    }

}
</script>
