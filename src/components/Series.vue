<template>
  <transition name="show-series">
    <div class="series_content" v-show="this.showDetail" ref="series">
      <div class="series_scroll">
        {{getSeriesData}}
        <div class="headimg_box">
          <img :src="this.category.headimg"/>
          <div class="close" @click="closeDetail"></div>
        </div>
        <coupon-wrap v-if="this.canReceive.length > 0 || this.couponReceiveList.cut" @getCoupon="getCoupon" :canReceive="this.canReceive" :couponReceiveList="this.couponReceiveList"></coupon-wrap>
        <section class="lesson">
          <div class="lessonTitle">
            <span class="IconRedcom">推荐</span>
            <h3>{{this.session['FsubTitle']}}</h3>
            <span class="AllQuan" :class="{Acurrent:getSelAll}" @click="selAll" v-show="zongPrice > 0 && this.unreceiveIds !== ''"><i></i>全选</span>
          </div>
          <div class="lessonList">
            <div class="LessonMain"  v-for="(value,key) in this.baglist">
              <label :id="'label_'+key" :class="{current:getSelGroup(value)}" @click="selGroup(value)">
                <!--<span v-if="value['unreceivedCount']==0"></span>-->
                <i v-if="value['unreceivedCount'] > 0"></i>
                <p class="ftitle">{{value['Ftitle']}}</p>
                <!--<div class="miaoshu">{{value['Fdesc']}}</div>-->
              </label>
              <ul>
                <li v-for="(item , k) in value['Flist']" @click="selBag(item)" :class="{current:item.active}">
                  <div class="bagImg" :class="{bagImgCurent: (key==0 && k==0)}" >
                    <img :src="'http://udata.youban.com/webimg/xuetang/map'+ item['Fapplogo']"/>
                  </div>
                  <div class="bagImgbuyInfo">
                    <p v-if="item['getway']===1">已免费领取</p>
                    <p v-else-if="item['getway']===2">已购买</p>
                    <p v-else-if="item['getway']===3">已内置</p>
                    <template v-else>
                      <span v-if="item['Fprice']==0">微信免费领</span>
                      <template v-else>
                        <span>￥{{item["Fprice"]/100}}</span>
                        <i></i>
                      </template>
                    </template>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div class="Hmainbox">
          <img :src="this.category['contentimg']"/>
          <img :src="this.category['studyimg']"/>
          <img :src="this.category['apppayimg']"/>
        </div>
      </div>

      <template v-if="zongPrice > 0">
        <div class="Hfexid">
          <div class="BagSaleHui" v-if="this.couponReceiveList.full">
            {{getStype}}，满{{this.couponReceiveList['full']/100}}减{{this.couponReceiveList['cut']/100}}，有效期至{{this.getDateTime(this.couponReceiveList['et']+604800)}}
          </div>
          <b class="hgbox">合计：</b>
          <span class="Heji">{{payPrice}}元</span>
          <span v-if="this.allprice >= this.couponReceiveList.full/100" class="salesmalltips">已优惠3元</span>
          <a href="javascript:;" class="buyBagid" @click="buyBag">马上购买</a>
        </div>
      </template>
      <template v-else>
        <div class="Hfexid" v-if="this.unreceiveIds !== ''">关注小伴龙微信公众帐号<a href="/app/school/followx">免费领取</a></div>
        <div class="Hfexid NobuyText" v-else>您已拥有该系列学堂包</div>
      </template>
      <pay-wrap ref="pay" :payObj="this.payObj" :havewx="this.havewx" :coins="this.coins" :huaweipay="this.huaweipay"></pay-wrap>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import payWrap from './PayWrap.vue';
  import coupon from './Coupon.vue';
  export default {
    name: 'app',
    props: {
      selSeries: {
        type: Object
      },
      havewx: {
        type: Number
      },
      coins: {
        type: Number
      },
      huaweipay: {
        type: Number
      }
    },
    data() {
      return {
        category: {},
        session: {},
        baglist: [],
        canReceive: [],
        couponReceiveList: {},
        showDetail: false,
        allprice: 0, // 选中包总价格
        zongprice: 0, // 系列所有包总价格
        unreceiveIds: '', // 系列未领取包ids
        payObj: {}
      };
    },
    created() {
    },
    computed: {
      getSeriesData() {
        if (this.selSeries.category) {
          this.category = this.selSeries.category;
          this.session = this.selSeries.session;
          this.baglist = this.session.list;
          this.canReceive = this.selSeries.canReceive ? this.selSeries.canReceive : '';
          this.couponReceiveList = this.selSeries.couponReceiveList ? this.selSeries.couponReceiveList : '';
        }
      },
      getSelAll() {
        let hasSelAll = true;
        this.baglist.map(function(list) {
          list.Flist.forEach(function (item) {
            if (!item.active) {
              hasSelAll = false;
            };
          });
        });
        return hasSelAll;
      },
      zongPrice() {
        let zPrice = 0;
        let aPrice = 0;
        let unIds = '';
        this.baglist.map((list) => {
          list.Flist.forEach((item) => {
            if (item.received === 0) {
              zPrice += 1;
              unIds += item.Fbag_id;
              if (item.active && item.Fprice === 100) {
                aPrice++;
              }
            };
          });
        });
        this.zongprice = zPrice;
        this.unreceiveIds = unIds;
        this.allprice = aPrice;
        return this.zongprice;
      },
      payPrice() {
        return this.allprice >= this.couponReceiveList.full / 100 ? (this.allprice - this.couponReceiveList.cut / 100) : this.allprice;// 优惠后需支付价格
      },
      getStype() {
        return this.couponReceiveList['basecoupon_type'] === 3 ? '新人首单优惠' : '奖学金优惠';
      }
    },
    methods: {
      showSeries() {
        this.showDetail = true;
        this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.series, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
//            默认选中一行
            for (let i = 0; i < this.baglist.length; i++) {
              if (this.baglist[i].unreceivedCount > 0) {
                this.baglist[i].Flist.map(function (item) {
                  Vue.set(item, 'active', true);
                });
                break;
              }
            }
        });
      },
      closeDetail() {
        this.showDetail = !this.showDetail;
      },
      selAll() {
        let selall = true;
        if (this.getSelAll) {
          selall = false;
        }
        this.baglist.map(function(list) {
            list.Flist.forEach(function (item) {
              Vue.set(item, 'active', selall);
            });
        });
      },
      selGroup(value) {
        let selgroup = true;
        if (this.getSelGroup(value)) {
          selgroup = false;
        }
        value.Flist.map(function (item) {
            Vue.set(item, 'active', selgroup);
        });
      },
      getSelGroup(value) {
        let hasSelGroup = true;
        value.Flist.forEach(function (item) {
          if (!item.active) {
            hasSelGroup = false;
          };
        });
        return hasSelGroup;
      },
      selBag(item) {
        if (!item.active) {
          Vue.set(item, 'active', true);
        } else {
          item.active = false;
        }
      },
      selInfo() {
        let bagids = '';
        this.baglist.map(function(list) {
          list.Flist.forEach(function (item) {
            if (item.active && item.Fprice === 100 && item.received === 0) {
              bagids += item.Fbag_id + '|';
            };
          });
        });
        this.payObj.payBagId = bagids.substr(0, bagids.length - 1);
        this.payObj.payTitle = this.category.FtypeName;
        this.payObj.urltag = 'xt_' + this.selSeries.mainBid + '-detail';
        this.payObj.Turl = 'index?series=0&';
        this.payObj.payPrice = this.payPrice;
      },
      buyBag() {
        this.selInfo();
        if (this.allprice > 0) {
          this.$refs.pay.showPayFun();
        } else {
          alert('你还没选用学堂包');
        }
      },
      getDateTime(endTime) {
        let time = new Date(endTime * 1000);
        return (time.getMonth() + 1) + '月' + time.getDate() + '日';
      },
      getCoupon(hasReceived) {
        if (hasReceived) {
         this.couponReceiveList = this.canReceive[0];
          this.couponReceiveList.et = this.canReceive[0].validdate;
          this.couponReceiveList.basecoupon_type = this.canReceive[0].type;
        }
      }
    },
    components: {
      'pay-wrap': payWrap,
      'coupon-wrap': coupon
    }
  };
</script>

<style  rel="stylesheet/css">
  .series_content{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:200;
    background: white;
  }
  .show-series-enter-active,.show-series-leave-active{
    transition: all 0.4s;
  }
  .show-series-enter,.show-series-leave-to{
    transform: translate3d(100%, 0, 0);
  }
  /*.series_scroll{height:100%;}*/
  .headimg_box,.Hmainbox{ clear: both; height: auto; overflow: hidden; }
  .Hmainbox{ padding-bottom: 60px;margin-bottom: 30px;background: white; }
  .headimg_box img{ width: 100%; height: auto; overflow: hidden; display: block; min-height: 221px; }
  .Hmainbox img{ width: 100%; height: auto; overflow: hidden; display: block; min-height: 150px;}
  .headimg_box .close{
    position: absolute;
    left:15px;
    top: 20px;
    width: 30px;
    height: 30px;
  }
  .headimg_box .close:before,.headimg_box .close:after{
    content: '';
    position: absolute;
    left:0px;
    width:16px;
    height:3px;
    border-radius: 2px;
    background: white;
  }
  .headimg_box .close:before{
    transform: rotate(45deg);
    top:15px;
  }
  .headimg_box .close:after{
    top:5px;
    transform: rotate(-45deg);
  }

  .lesson{ clear: both; height: auto; overflow: hidden; border-top: 1px solid #e1e1e1; background-color: #fff; }
  .lessonTitle{ position: relative; height: 40px; padding-left: 55px;  }
  .IconRedcom{ height: 26px; line-height: 26px;  text-align: center; padding: 0 7px; display: inline-block; position: absolute;left: 10px; top: 3px;font-size:14px; background-color: #00a0e9; color: #fff; }
  .IconRedcom:before{ content: "";width:0; position: absolute;left: 0; top: 26px;   height:0;    border-right:16px solid transparent;   border-top:10px solid #00a0e9; }
  .IconRedcom:after{ content: "";width:0; position: absolute; top: 26px; right: 0;  height:0;    border-bottom:10px solid transparent;   border-right:16px solid #00a0e9; }
  .lessonTitle h3{  font-size: 16px; font-weight: bold; height: 35px;  line-height: 35px;  }
  .AllQuan{ position: absolute; right: .1rem; top: 0px; height: 40px; width: 60px; line-height: 40px; font-size: 14px; padding-left: 5px;  }
  .AllQuan i{ display: inline-block; border-radius: 100px; width: 17px; height: 17px; right: 2px; position: relative; top: 5px; border:2px solid #9b9b9b; }
  .Acurrent i{border:2px solid transparent; top: 5px; background-color: #ff8400; }
  .Acurrent i:before{ content: ""; position: absolute;  left: 4px; top: 8px; width: 3px; height: 4px; background-color: #fff; transform: rotate(-45deg);  }
  .Acurrent i:after{ content: ""; position: absolute; left: 9px; top: 4px; width: 3px; height: 11px; background-color: #fff; transform: rotate(45deg); }

  .lessonList{ clear: both; height: auto; overflow: hidden; padding: .5rem;}
  .LessonMain{ border:1px solid #e1e1e1; height: auto; overflow: hidden; padding: 3px; position: relative; margin-bottom: 8px; z-index: 1; }
  .LessonMain label{ position:absolute;top:50%;transform: translateY(-50%); width:78px; line-height: 30px; margin: auto;font-size: 12px;text-align: center; }
  .LessonMain label i{ display: inline-block; border-radius: 100px; width: 17px; height: 17px;  right: 2px; position: relative; top: 7px; border:2px solid #9b9b9b;}
  .LessonMain label span{ display: inline-block;width: 21px; height: 21px;  right: 2px; position: relative;}
  .LessonMain label .ftitle{text-overflow: ellipsis;overflow: hidden;white-space:nowrap;}
  .LessonMain label.current i{border:2px solid #ff8400; background-color: #ff8400; }
  .LessonMain label.current i:before{ content: ""; position: absolute;  left: 4px; top: 8px; width: 3px; height: 4px; background-color: #fff; transform: rotate(-45deg);  }
  .LessonMain label.current i:after{ content: ""; position: absolute; left: 9px; top: 4px; width: 3px; height: 11px; background-color: #fff; transform: rotate(45deg); }
  .LessonMain ul{ width: 75%; float: right; height: auto; overflow: hidden; position: relative; padding-left: 1.5%; }
  .LessonMain ul:before{ left: 0; content: ""; width: 1px; height: 80%; position: absolute; top: 10%;border-left: 1px dashed #ccc; }
  .LessonMain ul li{  float: left; width: 33.33%;position: relative; }
  .LessonMain ul li:after{content: ""; position: absolute;right: 0;top: 10%;height: 80%;width: 0;border-left: 1px dashed #eee;}
  .LessonMain ul li:last-child:after{ border:0;}
  .LessonMain ul li span{ float: left; font-size: 12px; padding-left: 10px; color: #f30 }
  .LessonMain ul li i{ display: inline-block; border-radius: 100px; width: 15px; height: 15px; right: 2px; top: -2px; position: relative;  border:2px solid #9b9b9b; float: right; margin-right: 10px;}
  .LessonMain ul li.current i{border:2px solid #ff8400; background-color: #ff8400; }
  .LessonMain ul li.current i:before{ content: ""; position: absolute;   left: 4px; top: 7px; width: 2px; height: 4px;background-color: #fff; transform: rotate(-45deg);  }
  .LessonMain ul li.current i:after{ content: ""; position: absolute; left: 9px; top: 3px; width: 2px; height: 10px;  background-color: #fff; transform: rotate(45deg); }
  .Azhe{ position: fixed; width: 100%; height: 100%; z-index: 110; top: 0; left: 0; background-color: rgba(0,0,0,0.45);}
  .Aertips{ position: fixed; z-index: 111; width: 220px; height: 55px; background-color: #fff; border-radius: 3px; position: absolute; bottom: 0;top: 0; left: 0; right: 0; margin: auto; line-height: 55px; z-index: 999; text-align: center; color: #333; font-size: 14px; box-shadow: 0px 0px 0px 1000px rgba(0,0,0,0.8); }
  .bagImg{position: relative;}
  .bagImg img{ width: 96%;min-height: 94px; height: auto; overflow: hidden; display: block; }
  .bagImgbuyInfo{ height: auto; }
  .bagImgbuyInfo p{ text-align: center; color: #999; font-size:12px;}
  /*底部*/
  .BagSaleHui{ position: absolute; top: -23px; left: 0; width: 100%; font-size: 12px; text-align: center; color: #333; height: 23px; line-height: 23px; background-color: #ececec; }
  .Hfexid{position: fixed; left: 0;bottom: 0; width: 100%; height: 55px; line-height: 55px; text-indent: 1rem; font-size: 16px; background-color: #fff; border-top: 1px solid #ececec; z-index: 100;  }
  .Hfexid .Heji{ color: #f30; font-weight: bold; }
  .Hfexid .salesmalltips{  font-size: 14px; color: #555; padding-left: 10px; }
  .Hfexid a{ height: 55px; width: 140px; line-height: 55px; text-decoration: none; color: #fff; background-color: #ff681e; text-align: center; font-size: 16px; display: block; position: absolute; right: 0; top: 0; }
  .NobuyText{ text-align: center; font-size: 16px; background-color: #ececec; }
</style>
