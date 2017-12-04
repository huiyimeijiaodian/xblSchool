<template>
  <transition name="slide-pay">
    <div class="Maskbg" v-show="this.showPay">
      <div class="MaskMain">
        <div class="MaskTitle">
          <h3>小伴龙学堂</h3>
          <span class="CloseMask" @click="closePay"><a href="javascript:;"></a></span>
        </div>
        <div class="MaskPayInfo">
          <span>{{this.payObj.payPrice}}元</span>需付款
        </div>
        <div class="MaskPaylist">
          <ul>
            <li :class="{'current':selType === 1}" @click="selPayType(1)"><i class="pwxicon"></i>微信支付</li>
            <li :class="{'current':selType === 2}" @click="selPayType(2)"><i class="pqricon"></i>扫码支付</li>
            <li :class="{'current':selType === 3}" @click="selPayType(3)" v-show="this.isIphone"><i class="plbicon" ></i>龙币支付(余额{{this.coins}}元)</li>
            <li :class="{'current':selType === 4}" @click="selPayType(4)" v-show="this.huaweipay"><i class="phwicon"></i>华为支付(支持微信)</li>
          </ul>
        </div>
        <div class="MaskPayBtn" @click="gotoPay"><a href="javascript:;" class="payTips">{{this.payDesc()}}</a></div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'payWrap',
    props: {
      payObj: {
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
        showPay: false,
        isIphone: 0,
        selType: 1
      };
    },
    created() {
      this.isIpones();
    },
    computed: {
    },
    methods: {
      isIpones() {
        let ua = navigator.userAgent.toLowerCase();
        this.isIphone = ua.indexOf('iphone') > -1 ? 1 : 0;
        console.log('isIphone:', this.isIphone, ua);
      },
      showPayFun() {
        this.showPay = !this.showPay;
      },
      closePay() {
        this.showPay = !this.showPay;
      },
      payDesc() {
        if (this.selType === 3 && this.coins < this.payObj.payPrice) {
          return `龙币余额不足，立即充值`;
        } else {
          return `确认支付${this.payObj.payPrice}元`;
        }
      },
      selPayType(type) {
        this.selType = type;
      },
      gotoPay() {
        let TiaoUrl = '';
        switch (this.selType) {
          case 1: TiaoUrl = this.payObj.Turl + 'xbl_pay_bdata=' + this.payObj.payBagId + '&urltag=' + this.payObj.urltag + '&title=' + this.payObj.payTitle; break;
          case 2: TiaoUrl = this.payObj.Turl + 'pay_qrcode=' + this.payObj.payBagId + '&urltag=' + this.payObj.urltag + '&title=' + this.payObj.payTitle; break;
          case 3: TiaoUrl = this.payObj.Turl + 'pay_recharge=' + this.payObj.payBagId + '&urltag=' + this.payObj.urltag + '&title=' + this.payObj.payTitle; break;
          case 4: TiaoUrl = this.payObj.Turl + 'xbl_huawei_bdata=' + this.payObj.payBagId + '&urltag=' + this.payObj.urltag + '&title=' + this.payObj.payTitle; break;
          default: TiaoUrl = this.payObj.Turl + 'pay_recharge=' + this.payObj.payBagId + '&urltag=' + this.payObj.urltag + '&title=' + this.payObj.payTitle; break;
        }
        console.log('支付跳转：', TiaoUrl);
        if (this.selType === 3 && this.coins < this.payPrice) {
          alert('龙币不足!');
        }
        window.location.href = TiaoUrl;
      }
    }
  };
</script>

<style rel="stylesheet/css">
  .Maskbg{ position: fixed; left: 0; bottom:0;width: 100%; height: 100%;  background-color: rgba(0, 0, 0, 0.2);z-index: 120;}
  .MaskMain{ position: absolute; bottom: 0; left: 0; background-color: #fff; width: 100%; border-top: 1px solid #ececec; opacity: 1 }
  .MaskTitle{ height: 40px; line-height: 40px; text-align: center; font-size: 16px;border-bottom: 1px solid #f7f7f7; position: relative; }
  .MaskTitle h3{ height: 40px; line-height: 40px;  display: block;}
  .MaskTitle span{ display: block; position: absolute; right: 10px; width: 30px; height:30px; margin: auto; top: 0; bottom: 0; border-radius: 100%; z-index: 3;  }
  .MaskTitle span a{ display: block; height: 30px; width: 30px; }
  .MaskTitle span::before{content: "";  position: absolute;left: 5px;top: 14px;width: 20px; height: 2px; background-color: #333; display: block; transform: rotate(45deg);  }
  .MaskTitle span::after{ content: "";  position: absolute;left: 5px; top: 14px;width: 20px; height: 2px; background-color: #333; display: block; transform: rotate(-45deg); }
  .MaskPayInfo{ height: 45px; line-height: 45px;border-bottom: 1px solid #f7f7f7; font-size: 16px; text-indent: 1rem; }
  .MaskPayInfo span{ float: right; padding-right: 1rem;font-weight: bold; }
  .MaskPaylist ul{ height: auto; overflow: hidden; }
  .MaskPaylist ul li{ height: 50px; line-height: 50px; padding: 0 1rem 0 60px; border-bottom: 1px solid #f7f7f7; font-size: 14px; color: #555; position: relative; }
  .MaskPaylist ul li.current::before{ content: "";position: absolute; right: 30px; top: 23px;display: block;transform: rotate(-45deg); width: 2px; height: 8px; background-color: #09ab09;}
  .MaskPaylist ul li.current::after{ content: "";position: absolute; right: 20px; top: 14px; display: block;transform: rotate(45deg);  width: 2px; height: 20px; background-color: #09ab09;}
  .MaskPaylist ul li i{ display: inline-block;width:38px; height: 38px;position: absolute; left: 15px; top: 6px; margin-right: 10px;vertical-align: middle; background: url('//udata.youban.com/webimg/weixin/apppayicon.png?ve985255');   }
  .MaskPaylist ul li i.pwxicon{ background-position: 0 0; background-size:255px auto;}
  .MaskPaylist ul li i.pqricon{background-position: -43px -3px; background-size:255px auto; border-radius: 8px;width:32px; height: 32px;top: 9px;  left: 18px; }
  .MaskPaylist ul li i.plbicon{background-position: -80px 0; background-size:255px auto; left: 13px;}
  .MaskPaylist ul li i.phwicon{background-position: -213px 0; background-size:255px auto; left: 13px;}
  .MaskPayBtn{ height: auto; overflow: hidden }
  .MaskPayBtn a{ height: 55px; margin: 10px 7px; display: block;  line-height: 55px; background-color: #ff681e; text-align: center;  color: #fff; font-size: 18px; text-decoration: none; border-radius: 5px; }
  .Azhe{ position: fixed; width: 100%; height: 100%; z-index: 110; top: 0; left: 0; background-color: #000; opacity: 0.3;}
  .Aertips{ position: fixed;  width: 220px; height: 55px; background-color: #fff; border-radius: 3px;bottom: 0;top: 0; left: 0; right: 0; margin: auto; line-height: 55px; z-index: 999; text-align: center; color: #333; font-size: 14px; box-shadow: 0px 0px 0px 1000px rgba(0,0,0,0.8); }

  .slide-pay-enter-active,.slide-pay-leave-active{
    transition: all 0.5s;
  }
  .slide-pay-enter,.slide-pay-leave-to{
    bottom:-100%;
  }
</style>
