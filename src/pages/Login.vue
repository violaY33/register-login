<template>
    <div class="register">
        <Row>
            <Col span="8" offset="8">
                <h2>Login</h2>
                <Form ref="register" :model="register" :rules="ruleInline">
                    <FormItem prop="username">
                        <Input type="text" v-model="register.username" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="register.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem class="btn-group">
                        <Button type="primary" @click="handleSubmit('register')">Login</Button>
                        <Button type="default">Register</Button>
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
			register: {
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
                    this.$Message.success('Success!');
                    console.log(this.register)
                    this.$http.post('/login', {
                        username: this.register.username,
                        password: this.register.password
                    }).then((res) => {
                        console.log(res.data)
                    })
				} else {
					this.$Message.error('Fail!');
				}
			});
		},
	},
};
</script>

<style scoped>
.register {
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

