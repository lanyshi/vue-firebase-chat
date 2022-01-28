import { createLocalVue, shallowMount } from "@vue/test-utils"
import VueCookies from 'vue-cookies'
import PrivateChatLogin from '@/components/PrivateChatLogin.vue'

describe('PrivateChatLogin.vue room ID and pin input tests', () => {
    let wrapper;
    beforeEach(() => {
        const localVue = createLocalVue()
        localVue.use(VueCookies)
        wrapper = shallowMount(PrivateChatLogin, {
            localVue,
            mocks: {
                $route: {
                    params: {
                        action: 'enter'
                    }
                }
            },
            stubs: ['BootstrapIcon']
        })
    })
    it('empty inputs', async () => {
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.vm.errors.invalidId).toBe(true)
        expect(wrapper.vm.errors.invalidPin).toBe(true)
        expect(wrapper.vm.errors.message).toBe("Please fill out required fields.")
    })
    it('pin less than 4 digits', async () => {
        const idInput = wrapper.find('input[name="id"]')
        idInput.setValue("test")
        expect(wrapper.find('input[name="id"]').element.value).toBe("test")

        const pinInput = wrapper.find('input[name="pin"]')
        pinInput.setValue("123")
        expect(wrapper.find('input[name="pin"]').element.value).toBe("123")

        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.vm.errors.invalidPin).toBe(true)
        expect(wrapper.vm.errors.message).toBe("Must be 4 digits.")
    })
    it('pin contains not only numbers', async () => {
        const idInput = wrapper.find('input[name="id"]')
        idInput.setValue("test")
        expect(wrapper.find('input[name="id"]').element.value).toBe("test")

        const pinInput = wrapper.find('input[name="pin"]')
        pinInput.setValue("123a")
        expect(wrapper.find('input[name="pin"]').element.value).toBe("123a")

        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.vm.errors.invalidPin).toBe(true)
        expect(wrapper.vm.errors.message).toBe("Must contain only numbers.")
    })
})