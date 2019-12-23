import Vue from 'vue';
import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HouseholdTabs from "@/views/base-basic/family/components/HouseholdTabs.vue";
import sinon from "sinon";
/* describe("HouseholdTabs.vue", () => {
    it('watch监听测试', () => {
        const dataYear = '2017';
        const wrapper = shallowMount(HouseholdTabs, {
            propsData: { dataYear }
        });
        //expect(wrapper.vm.clickPoorState()).to.have.been.caller; 
       // expect(vm.groupnames.length).toEqual(1)

       const Constructor = Vue.extend(HouseholdTabs)
       const vm = new Constructor().$mount()
       console.log(vm)
       debugger
        vm._watchers[0].cb(true)
       Vue.nextTick( () => {
         expect(vm.playState).to.equal("play")
       })
       vm._watchers[0].cb(false)
       Vue.nextTick( () => {
         expect(vm.playState).to.equal("pause")
         done()
       }) 
    
    })
    it('有登录按钮', () => {
        const wrapper = shallowMount(HouseholdTabs);
        expect(wrapper.html()).to.contains('button');
    })
    it('登录请求发起校验失败', done => {
        const wrapper = shallowMount(HouseholdTabs);
        const callback = sinon.fake();
        wrapper.vm.$on('click', callback);
        wrapper.find('button').trigger('click');
        expect(callback).to.have.been.caller;
    }) 
}) */