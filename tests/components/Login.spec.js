import { createLocalVue, mount } from "@vue/test-utils"
import VueCookies from 'vue-cookies'
import Login from '@/components/Login.vue'

test('properly handles username input', async () => {
    const localVue = createLocalVue()
    localVue.use(VueCookies)

    const wrapper = mount(Login, {
        localVue
    })

    await wrapper.find("button").trigger('click')
})