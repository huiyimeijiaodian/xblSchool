<template>
  <div class="wrapper" @click="addSchool">
    <div :class="{'m-yessel':this.sclass.norreceiveCount === 0,'bgspan':this.sclass.norreceiveCount > 0}">
      <span></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    name: 'addCart',
    props: {
      sclass: {
        type: Object
      }
    },
    data() {
      return {};
    },
    created() {
      this.$nextTick(function () {
        document.getElementsByClassName('wrapper')[0].click(event);
      });
    },
    methods: {
      addSchool(event) {
        if (this.sclass.norreceiveCount > 0) {
          this.sclass.norreceiveCount = 0;
          if (!this.sclass.buycount) {
            Vue.set(this.sclass, 'buycount', 1);
          } else {
            this.sclass.buycount = 1;
          }
          this.$emit('addcart', event); // 触发当前实例上的事件，参数会传到监听器回调
        }
      }
    }
  };
</script>

<style rel="stylesheet/css">
  .bgspan, .m-yessel{width:1.5rem; height:1.5rem; display: inline-block; color: #fff; line-height:1.5rem; background: #00a4bd; border-radius:50%; position: relative;  background: -webkit-linear-gradient(60deg, #00a4bd, #00b7b0);}
  .bgspan span:before,.selection .list .bgspan span:after{width: 2px; height: 12px;  background-color: #fff; position: absolute;left:3px;  content: ""; top:4px;margin: inherit; }
  .bgspan span:before{transform: rotate(90deg); -webkit-transform: rotate(-90deg);}
  .bgspan span:after{transform: rotate(-180deg); -webkit-transform: rotate(180deg);}
  .centext .fcomlayer{width:55%; display: inline-block;color: #00c5a5}
  .m-yessel{background: #dadada;}
  .bgspan, .m-yessel{position: absolute; right: 0.5rem; bottom: 0.5rem;}
  .m-yessel span{position: absolute; left: 0.3rem; top: 0.1rem;}
  .m-yessel span:before{width: 2px; height: 8px; background-color: #fff; position: absolute; left: 2px; content: ""; top: 8px;transform: rotate(45deg);  margin: inherit; -webkit-transform: rotate(-45deg);}
  .m-yessel span:after{width: 2px;height: 14px; background-color: #fff; position: absolute; margin: inherit; top: 4px; content: ""; left: 9px; transform: rotate(-45deg); -webkit-transform: rotate(45deg);}
  .bgspan span{width: 1rem; display: inline-block; text-align: left; font-size: 1.2rem; position: absolute;  left: 0.5rem;top: 0.1rem;}
  .wrapper{position:absolute; right: 0.5rem; bottom: 0.2rem;width:2.5rem; height:2.5rem; display: inline-block;z-index: 2;}
</style>
