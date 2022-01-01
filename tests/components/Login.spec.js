import { createLocalVue, mount } from "@vue/test-utils"
import VueCookies from 'vue-cookies'
import Login from '@/components/Login.vue'

describe('Login.vue', () => {
    it('empty username input', async () => {
        const localVue = createLocalVue()
        localVue.use(VueCookies)

        const wrapper = mount(Login, {
            localVue
        })

        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.vm.errors.usernameError).toBe("Please enter username.")
    })

    it('long username input', async () => {
        const localVue = createLocalVue()
        localVue.use(VueCookies)

        const wrapper = mount(Login, {
            localVue
        })

        const usernameInput = wrapper.find('input[name="name"]')
        usernameInput.setValue("Lorem ipsum dolor sit amet, consectetur")
        expect(wrapper.find('input[name="name"]').element.value).toBe("Lorem ipsum dolor sit amet, consectetur")

        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.vm.errors.usernameError).toBe("Username can't be longer than 20 characters.")
    })
})