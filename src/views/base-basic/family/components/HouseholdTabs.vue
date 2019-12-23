<template>
  <div class="household-tabs">
    <div class="fix-wrap">
      <div class="swiper-container">
        <div
          class="prev"
          @click="preve"
        >
          <i></i>
        </div>
        <span class="year"><em>{{ year }}</em>年</span>
        <div
          class="next"
          @click="next"
        >
          <i></i>
        </div>
      </div>
      <ul class="position-year">
        <li
          v-for="(item, index) in yearList"
          :key="index"
          @click="chooseYear(item.dictValue)"
        >
          <span class="year"><em>{{ item.dictValue }}</em>年</span>
        </li>
      </ul>
    </div>
    <div class="h-tabs">
      <ul>
        <li
          class="liBg1"
          :class="{ active: this.poorState == '' }"
          @click="clickPoorState('')"
        >
          <div class="line lineBg1"></div>
          <div class="num">
            <em>{{ topInfo.all_family }}</em>户 / <em>{{ topInfo.all_member }}</em>人
          </div>
          <p>年初未脱贫</p>
        </li>
        <li
          class="liBg3"
          :class="{ active: this.poorState == '2' }"
          @click="clickPoorState('2')"
        >
          <div class="line lineBg3"></div>
          <div class="num">
            <em>{{ topInfo.no_poor_member }}</em>户 / <em>{{ topInfo.no_family }}</em>人
          </div>
          <p>预脱贫</p>
        </li>
        <li
          class="liBg4"
          :class="{ active: this.poorState == '1' }"
          @click="clickPoorState('1')"
        >
          <div class="line lineBg4"></div>
          <div class="num">
            <em>{{ topInfo.pre_no_poor }}</em>户 / <em>{{ topInfo.pre_no_member }}</em>人
          </div>
          <p>当年已脱贫</p>
        </li>
        <li
          class="liBg5"
          :class="{ active: this.poorState == '-2' }"
          @click="clickPoorState('-2')"
        >
          <div class="line lineBg5"></div>
          <div class="num">
            <em>{{ topInfo.fp_poor }}</em>户 / <em>{{ topInfo.fp_poor_member }}</em>人
          </div>
          <p>当年返贫</p>
        </li>
        <li
          class="liBg5"
          :class="{ active: this.poorState == '4' }"
          @click="clickPoorState('4')"
        >
          <div class="line lineBg5"></div>
          <div class="num">
            <em>{{ topInfo.xsb_family }}</em>户 / <em>{{ topInfo.xsb_member }}</em>人
          </div>
          <p>当年新识别</p>
        </li>
        <li
          class="liBg2"
          :class="{ active: this.poorState == '0' }"
          @click="clickPoorState('0')"
        >
          <div class="line lineBg2"></div>
          <div class="num">
            <em>{{ topInfo.poor_family }}</em>户 / <em>{{ topInfo.poor_member }}</em>人
          </div>
          <p>年末未脱贫</p>
        </li>
        <li
          class="liBg7"
          :class="{ active: this.poorState == '5' }"
          @click="clickPoorState('5')"
        >
          <div class="line lineBg7"></div>
          <div class="num">
            <em>{{ topInfo.jdlk_family }}</em>户 / <em>{{ topInfo.jdlk_member }}</em>人
          </div>
          <p>建档立卡（全口径）</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
import { getPoorListCount } from "@/api/basic";
import { getDictType } from "@/api/dict";
import { UserModule } from "../../../../store/modules/user";
import { PublicDictModule } from "../../../../store/modules/public-dict";

export const topInfo: { [type: string]: number } = {
  all_family: 0,
  all_member: 0,
  no_family: 0,
  no_poor_member: 0,
  poor_family: 0,
  poor_member: 0,
  pre_no_poor: 0,
  pre_no_member: 0,
  fp_poor: 0,
  fp_poor_member: 0,
  xsb_family: 0,
  xsb_member: 0,
  jdlk_family: 0,
  jdlk_member: 0,
  city_family: 0,
  city_member: 0
};
@Component({})
export default class HouseholdTabs extends Vue {
  @Prop({ required: true }) private areaCode!: string;
  @Prop({ required: true }) private dataYear!: string;
  @Prop({ required: true }) private listate!: string;
  private poorState: string = "";
  private year: string = "";
  private yearList: number[] = [];
  private maxYear: string = UserModule.dataYear;
  private courateYear: string = UserModule.courateYear;
  private topInfo: { [type: string]: number } = topInfo;

  mounted() {
    this.poorState = this.listate;
    this.year = this.dataYear;
    this.getPoorCountByCode();
    this.getDictByTypeId();
  }
  @Watch("year")
  onYearChange() {
    this.getPoorCountByCode();
    this.clickPoorState(this.poorState);
  }
  @Watch("areaCode")
  onAreaCodeChange() {
    this.getPoorCountByCode();
  }
  //获取村数据
  private getVillageData() {}
  private chooseYear(year: string) {
    this.year = year;
  }
  //年份
  private async getDictByTypeId() {
    const { data } = await getDictType({
      typeId: PublicDictModule.typeId
    });

    this.yearList = data.data;
  }
  //获取户信息
  private async getPoorCountByCode() {
    const { data } = await getPoorListCount({
      areaCode: this.areaCode,
      dataYear: this.year
    });
    if (data.data && data.data != null) {
      this.topInfo.all_family =
        data.data.all_family != null ? data.data.all_family : 0;
      this.topInfo.all_member =
        data.data.all_member != null ? data.data.all_member : 0;
      this.topInfo.no_family =
        data.data.no_family != null ? data.data.no_family : 0;
      this.topInfo.no_poor_member =
        data.data.no_poor_member != null ? data.data.no_poor_member : 0;
      this.topInfo.poor_family =
        data.data.poor_family != null ? data.data.poor_family : 0;
      this.topInfo.poor_member =
        data.data.poor_member != null ? data.data.poor_member : 0;
      this.topInfo.pre_no_poor =
        data.data.pre_no_poor != null ? data.data.pre_no_poor : 0;
      this.topInfo.pre_no_member =
        data.data.pre_no_member != null ? data.data.pre_no_member : 0;
      this.topInfo.fp_poor = data.data.fp_poor != null ? data.data.fp_poor : 0;
      this.topInfo.fp_poor_member =
        data.data.fp_poor_member != null ? data.data.fp_poor_member : 0;
      this.topInfo.jdlk_family =
        data.data.jdlk_family != null ? data.data.jdlk_family : 0;
      this.topInfo.jdlk_member =
        data.data.jdlk_member != null ? data.data.jdlk_member : 0;
      this.topInfo.xsb_family =
        data.data.city_family != null ? data.data.xsb_family : 0;
      this.topInfo.xsb_member =
        data.data.city_member != null ? data.data.xsb_member : 0;
      this.topInfo.city_family =
        data.data.city_family != null ? data.data.city_family : 0;
      this.topInfo.city_member =
        data.data.city_member != null ? data.data.city_member : 0;
    }
  }
  //点击年份切换数据方法
  private clickPoorState(listate: string) {
    this.poorState = listate;
    this.$emit("poorState", listate, this.year);
  }
  //上一年
  private preve() {
    if (parseInt(this.year) - 1 >= parseInt(this.courateYear)) {
      this.year = (parseInt(this.year) - 1).toString();
    }
  }
  //下一年
  private next() {
    if (parseInt(this.year) + 1 <= parseInt(this.maxYear)) {
      this.year = (parseInt(this.year) + 1).toString();
    }
  }
}
</script>

<style lang="scss" scoped>
.household-tabs {
  border-bottom: solid 1px #dedede;
  em {
    font-family: "reducto_condensed_ssiCn", "Arial Narrow";
    font-style: normal;
  }
}
.h-tabs {
  li {
    display: inline-block;
    vertical-align: middle;
    border: solid 1px #dedede;
    border-bottom: none;
    margin-right: 5px;
    padding-left: 8px;
    cursor: pointer;
    position: relative;
    padding: 10px 6px 9px 18px;
    border-radius: 7px 7px 0 0;
  }
  .num {
    font-size: 14px;
    color: #666666;
    em {
      font-size: 20px;
      height: 20px;
      line-height: 20px;
    }
  }
  p {
    font-size: 12px;
    color: #777;
  }
  .line {
    width: 4px;
    height: 36px;
    position: absolute;
    top: 12px;
    left: 6px;
  }
  .lineBg1 {
    background: #0ba0fd;
  }
  .lineBg2 {
    background: #f00;
  }
  .lineBg3 {
    background: #f38b25;
  }
  .lineBg4 {
    background: #54cb54;
  }
  .lineBg5 {
    background: #f69a23;
  }
  .lineBg6 {
    background: #f38b25;
  }
  .lineBg7 {
    background: #0ba0fd;
  }
  .active.liBg1 {
    border-color: #0ba0fd;
    background: #eaf6ff;
  }
  .active.liBg2 {
    border-color: #ff0000;
    background: #fff4f4;
  }
  .active.liBg3 {
    border-color: #f38b25;
    background: #fef6f0;
  }
  .active.liBg4 {
    border-color: #54cb54;
    background: #f6fcf6;
  }
  .active.liBg5 {
    border-color: #f69a23;
    background: #fff4f4;
  }
  .active.liBg6 {
    border-color: #f38b25;
    background: #fef6f0;
  }
  .active.liBg7 {
    border-color: #0ba0fd;
    background: #eaf6ff;
  }
}
.swiper-container {
  width: 100px;
  height: 61px;
  line-height: 61px;
  float: left;
  margin-bottom: -1px;
  border: 1px solid #cfd9db;
  margin-right: 6px;
  border-bottom: 0px;
  text-align: center;
  overflow: hidden;
  border-radius: 7px 7px 0 0;
  .year {
    em {
      font-size: 28px;
      color: #5697da;
    }
  }
  .prev {
    float: left;
    width: 14px;
    height: 100%;
    cursor: pointer;
    border-right: 1px solid #cfd9db;
    i {
      display: block;
      width: 0;
      height: 0;
      border-width: 6px 6px 6px 0;
      border-style: solid;
      border-color: transparent #666 transparent transparent;
      margin: 24px 2px;
      position: relative;
    }
  }
  .wh_content {
    height: 61px;
    width: 70px;
    line-height: 61px;
    float: left;
  }
  .next {
    float: right;
    width: 14px;
    height: 100%;
    cursor: pointer;
    border-left: 1px solid #cfd9db;
    i {
      display: block;
      width: 0;
      height: 0;
      border-width: 6px 0 6px 6px;
      border-style: solid;
      border-color: transparent transparent transparent #666;
      margin: 24px 4px;
      position: relative;
    }
  }
  .prev:hover,
  .next:hover {
    background: #eaf6ff;
  }
  .button:active {
    opacity: 0.5;
    color: #333;
  }
}
.fix-wrap:hover .position-year {
  display: block;
}
.position-year {
  display: none;
  position: absolute;
  width: 94%;
  left: 0;
  height: auto;
  top: 61px;
  z-index: 9999;
  text-align: center;
  cursor: pointer;
  background: #fff;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  em {
    font-size: 28px;
    color: #5697da;
  }
  li {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  li:last-child {
    border-bottom: 1px solid #ccc;
  }
}
.fix-wrap {
  position: relative;
  float: left;
}
</style>
