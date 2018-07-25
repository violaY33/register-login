<template>
    <Layout class="home">
        <Header class="header">主页</Header>
        <Content class="content">Content</Content>
    </Layout>
</template>

<script>
export default {
    name: 'Home',
    created() {
        this.$http.get('/verify').then((res) => {
            console.log(res.data)
        })
    },
}
</script>


<style scoped>
.header {
    color: #fff;
}
</style>

