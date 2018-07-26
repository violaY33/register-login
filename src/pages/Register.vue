<template>
    <div class="registerData">
        <Row>
            <Col span="8" offset="8">
            <h2>Register</h2>
            <Form ref="registerData" :model="registerData" :rules="ruleInline">
                <FormItem prop="username">
                    <Input type="text" v-model="registerData.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="registerData.password" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem class="btn-group">
                    <Button type="primary" @click="handleSubmit('registerData')">Register</Button>
                    <Button type="default" @click="login">Login</Button>
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
			registerData: {
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
					this.$http
						.post('/register', {
							username: this.registerData.username,
							password: this.registerData.password,
						})
						.then(res => {
                            const data = res.data
							if (data.isSuccess) {
								this.$Message.success(data.msg)
								this.$router.push('/login')
							} else {
								this.$Message.success(data.msg)
							}
						})
						.catch(err => {
							console.log(err)
						});
				} else {
					this.$Message.error('Fail!');
				}
			});
		},
		login() {
			this.$router.push('/login');
		},
	},
};
</script>

<style scoped>
.registerData {
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

