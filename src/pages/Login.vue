<template>
    <div class="loginData">
        <Row>
            <Col span="8" offset="8">
                <h2>Login</h2>
                <Form ref="loginData" :model="loginData" :rules="ruleInline">
                    <FormItem prop="username">
                        <Input type="text" v-model="loginData.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="loginData.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleSubmit('loginData')">Login</Button>
                        <Button type="default" @click="register">register</Button>
                    </FormItem>
                </Form>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
	data() {
		return {
			loginData: {
				username: '',
				password: '',
			},
			ruleInline: {
				username: [{ required: true, message: 'Please fill in the user name', trigger: 'blur' }],
				password: [
					{ required: true, message: 'Please fill in the password.', trigger: 'blur' },
					{
						type: 'string',
						min: 6,
						message: 'The password length cannot be less than 6 bits',
						trigger: 'blur',
					},
				],
			},
		};
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
                    this.$http.post('/login', {
                        username: this.loginData.username,
                        password: this.loginData.password
                    }).then((res) => {
                        const data = res.data
                        if (data.valid) {
                            this.$Message.success(data.msg)
                            this.$router.push('/')
                        } else {
                            this.$Message.error(data.msg)
                        }
                    })
				} else {
					this.$Message.error('Fail!');
				}
			});
        },
        register() {
            this.$router.push('/register')
        },
	},
};
</script>

<style scoped>
.loginData {
	padding: 50px;
}

h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #ccc;
}

.btn-group {
    text-align: center;
}

</style>

