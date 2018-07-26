<template>
    <Layout class="home">
        <Header class="header">
            <Row>
                <Col span="8">🎉 Home</Col>
                <Col span="8" offset="8" class="btn-group">
                    <Button type="primary" @click="logout" v-if="isLogin">Logout</Button>
                    <Button type="primary" @click="login" v-if="!isLogin">Login</Button>
                    <Button @click="register" v-if="!isLogin">Register</Button>
                </Col>
            </Row>
        </Header>
        <Content class="content">{{ msg }}</Content>
    </Layout>
</template>

<script>
export default {
	name: 'Home',
	created() {
		this.$http
			.get('/verify')
			.then(res => {
				console.log(res.data);
				const data = res.data;
				if (data.isAccessAllowed) {
					this.msg = data.msg;
					this.isLogin = true;
				} else {
					this.msg = data.msg;
					this.isLogin = false;
				}
			})
			.catch(err => {
				console.log(err);
			});
	},
	data() {
		return {
			msg: '',
			isLogin: false,
		};
    },
    methods: {
        register() {
            this.$router.push('/register')
        },
        login() {
            this.$router.push('/login')
        },
        logout() {
            this.$http.get('/logout')
            .then(res => {
                const data = res.data
                console.log(res.data)
                if (data.isSuccess) {
                    this.$Message.success(data.msg)
                    this.$router.push('/login')
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
};
</script>


<style scoped>
.header {
	color: #fff;
	font-size: 18px;
}

.btn-group {
    text-align: right;
}

.content {
	padding: 50px;
}
</style>

