import { expect } from "chai"; //断言库 mocha是测试框架
//Karma它是一个测试工具，能让你的代码在浏览器环境下测试
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { mount } from '@vue/test-utils';
import sinon from 'sinon'
//组件测试  函数测试 单元测试
describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = 'xxx';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).to.include(msg);
  });
});

/* describe('Click event', () => {
  it('Click on yes button calls our method with argument "yes"', () => {
    const spy = sinon.spy()
    const wrapper = mount(HelloWorld, {
      propsData: {
        callMe: spy
      }
    })
    wrapper.find('button.yes').trigger('click');
    spy.calledWith('yes').should.be.ok;
  })
}) */
//Vue Test Utils 是 Vue.js 官方的单元测试实用工具库。
//模拟必要的输入 (prop、注入和用户事件) 和对输出 (渲染结果、触发的自定义事件) 的断言来测试 Vue 组件
/*
//mount  shallowMount(不会挂载子组件 避免测试树过大)创建包裹器 mount(组件).vm就是实例对象
describe块称为"测试套件"(test suite), 表示一组相关的测试. 它是一个函数,
第一个参数是测试套件的名称, 第二个参数是一个实际执行的函数.
*/
/* it块称为"测试用例"(test case), 表示一个单独的测试, 是测试的最小单位.
它也是一个函数, 第一个参数是测试用例的名称(通常描述你的断言结果), 第二个参数是
一个实际执行的函数. */
/* 测试组件渲染出来的
 HTML expect(wrapper.html()).toContain('<span class="count">0</span>')
 expect(wrapper.contains('button')).toBe(true)
  */
/* 交互 点击事件 通过find获取实例 可以触发trigger
 expect(wrapper.vm.count).toBe(0)
  const button = wrapper.find('button')
  button.trigger('click')
  expect(wrapper.vm.count).toBe(1) */
/*
describe('Toast.vue', () => {
  it('存在', () => {
      expect(Toast).to.exist
  })
  it('autoClose', (done) => {
      const wrapper = mount(Toast,{
          propsData: {
              autoClose: 1,
          }
      })
      const vm = wrapper.vm
      vm.$on('close', () => {
          expect(document.body.contains(vm.$el)).to.eq(false)
          done()
      })
  })
  it('接受 enableHtml', () => {
      const wrapper = mount(Toast, {
          enableHtml:true,
          slots:{
              default:'<strong id="test">hi</strong>'
          }
      })
      const vm = wrapper.vm
      let strong = vm.$el.querySelector('#test')
      expect(strong).to.exist
  })
})
*/
/*
describe('hooks', function() {

 before(function() {
   // 在本区块的所有测试用例之前执行
 });

 after(function() {
   // 在本区块的所有测试用例之后执行
 });

 beforeEach(function() {
   // 在本区块的每个测试用例之前执行
 });

 afterEach(function() {
   // 在本区块的每个测试用例之后执行
 });
 // test cases
})
*/
/*
sinon.spy:
spy生成一个间谍函数，它会记录下函数调用的参数，返回值，this的值，以及抛出的异常
sinon.stub:
就是spy的加强版，不仅完全支持spy的各种操作，还能操作函数的行为。
sinon.fake:
*/
/* 工具类函数测试
  // 相等或不相等
  expect(1 + 1).to.be.equal(2);
  expect(1 + 1).to.be.not.equal(3);

  // 布尔值为true
  expect('hello').to.be.ok;
  expect(false).to.not.be.ok;

  // typeof
  expect('test').to.be.a('string');
  expect({ foo: 'bar' }).to.be.an('object');
  expect(foo).to.be.an.instanceof(Foo);

  // include
  expect([1,2,3]).to.include(2);
  expect('foobar').to.contain('foo');
  expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

  // empty
  expect([]).to.be.empty;
  expect('').to.be.empty;
  expect({}).to.be.empty; */