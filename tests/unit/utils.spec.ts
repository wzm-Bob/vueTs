import { expect } from "chai";
import * as utils from "@/utils/baseFun";
//工具类测试
describe('utils.js', () => {
    it('toHasUnitString应该能输出正确的值', done => {
        expect(utils.toHasUnitString(100000000, 1)).to.be.an('object');
        expect(utils.toHasUnitString(100000000, 1)).to.include.keys('unit');
        expect(utils.toHasUnitString(100000000, 2)).to.have.deep.property('data', '1.00');
        expect(utils.toHasUnitString(100000000, 1)).to.have.deep.property('unit', '亿');
        expect(utils.toHasUnitString()).to.have.deep.property('data', 0);
        expect(utils.toHasUnitString(1000)).to.have.deep.property('unit', '');
        done();//这里应该调用done，否则会出错
    })
    it('getParentAreaCodeByCodeAndLevel应该能输出正确的值', done => {
        expect(utils.getParentAreaCodeByCodeAndLevel('513425000000', '2')).to.be.a('string');
        expect(utils.getParentAreaCodeByCodeAndLevel('513425000000', '1')).to.be.equal('510000000000');
        expect(utils.getParentAreaCodeByCodeAndLevel('513425000000', '2')).to.be.ok;
        expect(utils.getParentAreaCodeByCodeAndLevel('513425000000', '1')).to.contain('51');
        done();//这里应该调用done，否则会出错
    })
})