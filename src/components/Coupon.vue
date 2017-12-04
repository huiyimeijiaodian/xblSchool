<template>
  <div class="LQHongBao">
    <div class="LQfloatLeft">
      {{getCouponInfo}}
      <h2>￥<span>{{this.couponInfo.cut/100}}</span></h2>
      <p>满{{this.couponInfo.full/100}}元可用</p>
    </div>
    <div class="LQfloatRight">
      <h3>{{getStype}}</h3>
      <p class="lineQinfo">{{getCouponTime}}</p>
    </div>
    <a :class="{Freebtn:this.couponInfo.isReceive, grayBtn:!this.couponInfo.isReceive}" id="LineHongBao" href="javascript:;" @click="this.toReceive">{{canReciveText}}</a>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    name: 'coupon',
    props: {
      canReceive: {
        type: Array
      },
      couponReceiveList: {
        type: Object
      }
    },
    data() {
      return {
        couponInfo: {}
      };
    },
    created() {
    },
    computed: {
      getCouponInfo() {
        this.couponInfo = this.canReceive.length > 0 ? this.canReceive[0] : this.couponReceiveList;
        if (this.couponInfo && this.couponInfo !== {}) {
          this.couponInfo.stype = this.canReceive.length > 0 ? this.canReceive[0]['type'] : this.couponReceiveList['basecoupon_type'];
          Vue.set(this.couponInfo, 'isReceive', this.canReceive.length > 0 ? 1 : 0);
          this.couponInfo.endTime = this.canReceive.length > 0 ? this.canReceive[0]['validdate'] : this.couponReceiveList['et'];
        };
      },
      getStype() {
        return this.couponInfo['stype'] === 3 ? '新人首单优惠' : '奖学金优惠';
      },
      getCouponTime() {
        return this.couponInfo.isReceive > 0 ? '领取后7天有效' : ('有效期至 ' + this.getDateTime(this.couponInfo.endTime + 604800) + ' 23:59:59');
      },
      canReciveText() {
        return this.couponInfo.isReceive > 0 ? '领取' : '已领取';
      }
    },
    methods: {
      getDateTime(endTime) {
        let time = new Date(endTime * 1000);
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
      },
      toReceive() {
        if (this.couponInfo.isReceive) {
          this.couponInfo.isReceive = !this.couponInfo.isReceive;
         console.log('可领取', this.couponInfo.isReceive);
          this.$http({
            method: 'post',
            url: 'http://wxxbl.youban.com/app/conpon/receive.json',
            data: {
              type: this.couponInfo.stype,
              couponId: this.couponInfo.coupon_id
            }
          }).then(function (respone) {
            let receiveData = Object.assign({}, respone.data);
            console.log('领取成功');
            this.$emit('getCoupon', true);
          }).catch((respone) => {
            console.log('error:', respone);
            this.couponInfo.isReceive = 0;
            this.$emit('getCoupon', true); // test,true。实际领取失败为false
          });
        }
      }
    }
  };
</script>

<style rel="stylesheet/css">
  .LQHongBao{ margin: 1rem 0.6rem; height: auto; min-height: 70px; overflow: hidden; border: 1px solid #ececec; border-radius:0 0 5px 5px; border-bottom: 4px solid #f90; position: relative;background: url('http://udata.youban.com/webimg/weixin/rb_xbl.png') no-repeat right top;background-size: auto 100%;
    font-size:12px; }
  .LQHongBao::before{ display: block; height: 15px; position: absolute; left: 0; top: 0; width: 100%; }
  .LQHongBao::after{ content: ""; background: url('http://udata.youban.com/webimg/weixin/rb_xbl.png') no-repeat right 0; background-size: auto 100%; display: block; height: auto; min-height: 80px; overflow: hidden; position: absolute; right: 0; top: 0;  }
  .LQfloatLeft{ width: 23%; height: 100%; position: absolute; left: 0; top: 0; }
  .LQfloatLeft::before{ width: 1px; height: 100%; display: block; content: ""; position: absolute; right: 0; top: 0; border-right: 1px dashed #ececec; }
  .LQfloatLeft h2{ text-align: center; height: 50px; line-height: 55px; font-size: 24px; color: #ff681e; }
  .LQfloatLeft h2 span{ font-size: 32px; font-weight: bolder; }
  .LQfloatLeft p{ text-align: center; position: relative; top: -5px; color: #999; }
  .LQfloatRight{ margin-left: 25%;  }
  .LQfloatRight h3{ height: 45px; line-height: 55px; font-size: 18px; }
  .LQHongBao a{position: absolute; right: .5rem; top: 0; bottom: 0; margin: auto; height: 25px; line-height: 25px; font-size: 16px;text-decoration: none; width: 60px; text-align: center; border-radius: 50px; }
  .Freebtn{ border: 2px solid #f90;  color: #f90; }
  .LQfloatRight p{color: #999;}
  .grayBtn{border: 2px solid #ccc;  color: #ccc; }
</style>
