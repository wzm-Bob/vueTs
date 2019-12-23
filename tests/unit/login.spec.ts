import chai, { expect } from "chai";
import { shallowMount, mount } from "@vue/test-utils";
import login from "@/views/global-login/index.vue";
import sinon from "sinon";
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
describe("login.vue", () => {
    it('有codeImageUrl', () => {
        const codeImageUrl = 'xxx';
        const wrapper = shallowMount(login, {
            propsData: { codeImageUrl }
        });
        expect(wrapper.html()).to.contain('xxx');
    })
    it('有登录按钮', () => {
        const wrapper = shallowMount(login);
        expect(wrapper.html()).to.contains('button');
    })
    it('登录异步测试', done => {
        const wrapper = shallowMount(login);
        wrapper.find('button').trigger('click')
        wrapper.vm.$nextTick(() => {
            expect(wrapper.html()).to.contain('123')
            done()
        })
    })
 /*    it('验证码事件', done => {
        //const callback = sinon.fake();//间谍函数
        const callback = sinon.stub()//存根 覆写全局或局部注册的组件
        const wrapper = mount(login);
        const imgArray = wrapper.findAll('img');
        wrapper.vm.$on('click',callback)
        imgArray.trigger('click');
        expect(callback).to.have.been.called;
    }) */
})