<template>
  <div class="shopcart">
    <div class="settlement">
      <div class="shopping-cart">
        <span class="m-icon-car" :class="{'addCart':this.isAddSel}" @click="toggleShow">
          <em class="sprite car"></em>
          <span v-show="this.isAddSel" class="order_item_num">{{this.selectSchool.length}}</span>
        </span>
        <span class="total graycolor">
            <i>合计：</i><span id="_order_total">{{allPrice}}</span>元
          </span>
      </div>
      <div class="gray" :class="{'addseleced':this.isAddSel}" @click="gobuy">
        <a href="javascript:;">立即购买</a>
      </div>
    </div>
    <transition name="fade-mask">
      <div class="mask" v-show="this.showCart" @click="toggleShow"> </div>
    </transition>
    <transition name="slide-cart">
      <div class="hide-shoppingcar" v-show="this.showCart">
        <div class="cart">
          <h3>购物车<span class="shopshow" @click="toggleShow"></span></h3>
          <div class="shopping-wrapper">
              <!-- js填充购物车列表 -->
              <div v-for="item in selectSchool" class="list">
                <span class="subtraction">{{item.name}}</span>
                <span class="nuber">￥{{needBuyNum(item.norreceiveList)}}</span>
                <span class="delete_item" @click="deceNum(item)">
                  <i class="sprite deletshop"></i>
                </span>
              </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="drop-ball" @before-enter="beforeDrop" @enter="droping" @after-enter="afterDrop">
        <div class="ball" v-show="showBall">
          <div class="ball-inner"></div>
        </div>
    </transition>

    <pay-wrap ref="pay" :payObj="this.payObj" :havewx="this.havewx" :coins="this.coins" :huaweipay="this.huaweipay"></pay-wrap>

  </div>
</template>

<script type="text/ecmascript-6">
  import payWrap from './PayWrap.vue';

  export default {
    name: 'shopcart',
    props: {
      selectSchool: {
        type: Array,
        defaults() {
          return [];
        }
      },
      xtList: {
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
        showCart: false,
        allprice: 0,
        payObj: {},
        showBall: false,
        ballX: 300,
        ballY: 150
      };
    },
    created() {
    },
    computed: {
      allCount() {
        return this.selectSchool.length;
      },
      allPrice() {
        let allprice = 0;
        this.selectSchool.forEach((myschool) => {
          allprice += parseInt(this.needBuyNum(myschool.norreceiveList));
        });
        this.allprice = allprice;
        return allprice;
      },
      isAddSel() {
        return this.selectSchool.length > 0;
      }
    },
    methods: {
      needBuyNum(norreceiveList) {
        let buyPrice = 0;
        norreceiveList.forEach((list) => {
          buyPrice += (this.xtList[parseInt(list)] ? this.xtList[parseInt(list)].Fprice : 0);
        });
        return (buyPrice / 100).toFixed(2);
      },
      toggleShow() {
        if (this.isAddSel) {
          this.showCart = !this.showCart;
        }
      },
      deceNum(item) {
        item.buycount = 0;
        item.norreceiveCount = 1;
        let index = this.selectSchool.indexOf(item);
        this.selectSchool.splice(index, 1);
        if (this.selectSchool.length === 0) {
          this.showCart = false;
        }
      },
      gobuy() {
        this.selInfo();
        if (this.allprice > 0) {
          this.$refs.pay.showPayFun();
        } else {
          alert('你还没选用学堂包');
        }
      },
      selInfo() {
        let bagids = '';
        let title = '';
        this.selectSchool.forEach((selItem) => {
          bagids += selItem.buydata + '|';
          title += selItem.name + '|';
        });
        this.payObj.payBagId = bagids.substr(0, bagids.length - 1);
        this.payObj.payTitle = title.substr(0, title.length - 1);
        this.payObj.urltag = 'appshopcart-self';
        this.payObj.Turl = 'index?index=0&';
        this.payObj.payPrice = this.allprice;
      },
      dropBall(event) {
        console.log('shopcart drop ball:', event, event.clientX, event.clientY);
        this.ballX = event.clientX !== 0 ? event.clientX : '154';// 默认第一个位置（154,335）
        this.ballY = event.clientY !== 0 ? event.clientY : '335';
        this.showBall = true;
      },
      beforeDrop(el) {
        console.log('ball:', this.ballX, this.ballY, el.style.left);
        let x = this.ballX - 40;
        let y = -(window.innerHeight - this.ballY - 28);
        el.style.display = '';
        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
        el.style.transform = `translate3d(0,${y}px,0)`;
        let inner = el.getElementsByClassName('ball-inner')[0];
        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
        inner.style.transform = `translate3d(${x}px,0,0)`;
      },
      droping(el, done) {
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('ball-inner')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        this.showBall = false;
        el.style.display = 'none';
      }
    },
    components: {
      'pay-wrap': payWrap
    }
  };
</script>

<style rel="stylesheet/css">
  .shopcart{  position: fixed;bottom: 0;left:0rem;width:100%;  height:4.5rem;  z-index:100;}
  .settlement{width: 100%;height:4.5rem;border-top: 1px solid #e3e3e3;background: #fff;z-index: 106;padding:0.45rem 3% 0.5rem 3%;box-sizing: border-box;}
  .settlement .shopping-cart{width:52%;display: inline-block;vertical-align: top;position: relative;}
  .settlement .shopping-cart .total{ display: inline-block;  height:3.5rem;line-height:3.5rem; color: #ff8400; font-size: 1rem;vertical-align: top;}
  .settlement .shopping-cart .total i{color:#00a3be;}
  .sprite{display: inline-block; background: transparent url(http://udata.youban.com/webimg/weixin/xuetang_newbg2017707.png?1012) no-repeat center top;  background-size: 5.2rem 18.1rem; z-index: 100;}
  .deletshop{width:1.3rem;   height:1.3rem;  border-radius: 50%;  border: .1rem solid #dadada;  position: relative;}
  .deletshop:before{width: 2px; height:11px; background-color: #dadada; position: absolute; left:9px; content: ""; top:5px; transform: rotate(90deg); margin: inherit;}
  .settlement .shopping-cart .m-icon-car{ width: 3.5rem; height: 3.5rem; border-radius: 5rem; background:#cacaca; display: inline-block;  position: relative;}
  .order_item_num{ width:1.2rem;height:1.2rem; background: #ff8400; display: inline-block;text-align: center; line-height:1.2rem;font-size: .6rem; border-radius: 2rem; position: absolute; right: -.5rem;  top:0;color:#fff;  border: .1rem solid #fff; }
  .settlement .shopping-cart .m-icon-car .car{width:3rem; height:3rem;  background-position: .6rem .7rem;  background-size: 170%;}
  .shopping-cart .m-icon-car:after{ content: ''; position: absolute; left: 0;  bottom: -0.2rem; width: 3.5rem; height: 3.5rem; border-radius: 50%; background: #e7e8e8; z-index: -1;}
  .settlement .gray{ height:3rem; text-align: center;border-radius: .5rem;display: inline-block;  margin-top: 0.3rem; width: 45%;  position: relative; background:#ccc;border-radius: 3rem;}
  .addseleced span{background: #f2deca !important;}
  .settlement .gray a{color: #fff;font-size: 1.2rem;  line-height:3rem; width: 100%;display: inline-block; text-decoration: none; border-radius: 3rem;box-shadow: 1px 3px 0px #eee;}
  .addseleced{background: -webkit-linear-gradient(60deg, #ffa200, #ff8500) !important;}
  .addCart{background:#00A3BE !important;border-radius: 3rem;}
  .shopping-wrapper{height: auto;overflow: auto;overflow-x:hidden;max-height: 274px; -webkit-overflow-scrolling:touch;}
  .hide-shoppingcar{position: absolute;top:0;left:0; width: 100%;background: #fff; transform: translate3d(0,-100%,0);  z-index:-1;}
  .hide-shoppingcar h3{ padding: 0rem 1rem; position: relative; font-size:0.8rem; color: #333;height: 45px; line-height: 45px;background: #f3f5f7; border-bottom: 1px solid rgba(7,17,27,0.1);}
  .hide-shoppingcar h3 span{position:absolute;right:1rem;width:1.3rem;height:1.3rem;line-height:1.3rem;display:inline-block;border:.1rem solid #00A3BE;text-align:center;border-radius: 3rem;top:.75rem;color: #00A3BE;}
  .hide-shoppingcar h3 span:before{width: 2px;height: 8px; background-color: #00A3BE; position: absolute;left: 7px; content:""; top:6px;transform: rotate(45deg); margin:inherit;}
  .hide-shoppingcar h3 span:after{width: 2px; height: 8px; background-color: #00A3BE; position: absolute;margin:inherit;top:6px; content: "";left:12px;transform:rotate(-45deg); }
  .hide-shoppingcar .list{border-bottom:1px solid #eee;margin:0rem 1rem; box-sizing: border-box; position: relative; padding-bottom: 0.8rem;}
  .hide-shoppingcar .list:last-child{border-bottom: 0px;}
  .hide-shoppingcar .list .subtraction{font-size: .9rem;color:#333;display: inline-block;width:50%;}
  .hide-shoppingcar .list .subtraction strong{font-size: .7rem;display: block;color:#a2a2a2;}
  .hide-shoppingcar .list .subtraction h4{font-size: 1.2rem;}
  .hide-shoppingcar .list .nuber{display: inline-block;width:20%;text-align: center;  font-size: 1rem;color: #ff8400; }
  .hide-shoppingcar .list .delete_item {display: inline-block; text-align: center; right:-0.9rem;  position: absolute; bottom:0.5rem; width: 15%;}
  .hide-shoppingcar .list{ padding: 1rem 0 0.8rem 1rem;}
  .hide-shoppingcar h3{ color: #666;}
  @media screen and (min-width:360px)and (max-width: 360px){
    .settlement .gray{width:45%;}
  }
  .mask{ position: fixed;width: 100%; height: 100%;top:0; left:0; background: rgba(0,0,0,0.4);z-index: -1;}

  .slide-cart-center-active,.slide-cart-leave-active{
    transition: all 0.5s
  }
  .slide-cart-center,.slide-cart-leave-to{
    transform: translate3d(0,0,0);
  }
  .fade-mask-center-active,.fade-mask-leave-active{
    transition: opacity .5s;
  }
  .fade-mask-center,.fade-mask-leave-to{
    opacity: 0;
  }

  /*抛小球*/
  .ball{
    position: fixed;
    bottom: 28px;
    left: 28px;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
  .ball-inner{
    width: 22px;
    height:22px;
    background: #00a4bd;
    border-radius: 50%;
    transition: all 0.4s linear
  }

</style>
