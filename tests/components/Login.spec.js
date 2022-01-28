import { createLocalVue, mount } from "@vue/test-utils"
import VueCookies from 'vue-cookies'
import Login from '@/components/Login.vue'

describe('Login.vue username and password input tests', () => {
    let wrapper;
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(VueCookies)
        wrapper = mount(Login, {
            localVue
        })
    })
    it('empty inputs', async () => {
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.vm.errors.usernameError).toBe("Please enter a username.")
        expect(wrapper.vm.errors.passwordError).toBe("Please enter password.")
    })
    it('empty username input', async () => {
        const passwordInput = wrapper.find('input[name="password"]')
        passwordInput.setValue("1234")
        expect(wrapper.find('input[name="password"]').element.value).toBe("1234")

        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.vm.errors.passwordError).toBe(null)
        expect(wrapper.vm.errors.usernameError).toBe("Please enter a username.")
    })

    it('empty password input', async () => {
        const usernameInput = wrapper.find('input[name="name"]')
        usernameInput.setValue("test")
        expect(wrapper.find('input[name="name"]').element.value).toBe("test")

        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.vm.errors.usernameError).toBe(null)
        expect(wrapper.vm.errors.passwordError).toBe("Please enter password.")
    })
})