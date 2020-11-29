import {Button} from 'element-ui'
import {Form, FormItem, Input} from 'element-ui'
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'

Vue.use(Button)
.use(Form)
.use(FormItem)
.use(Input);
Vue.prototype.$message = Message;
