<template>
  <transition name="show-loading">
    <div class="mask_load" v-show="this.showLoading">
      <div class="spinner">
        <div class="spinner-container container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container3">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'loading-mask',
    props: {
    },
    data() {
      return {
        showLoading: true
      };
    },
    methods: {
      showLoadmask() {
        this.showLoading = true;
      },
      colseLoadmask() {
        this.showLoading = false;
      }
    }
  };
</script>

<style rel="stylesheet/css">
  .mask_load{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    z-index:999;
  }
  .show-loading-enter,.show-loading-leave-to{
    opacity: 0;
  }
  .show-loading-enter-active,.show-loading-leave-active{
    transition: all 0.5s;
  }
  .spinner {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%,-50%);
    width: 40px;
    height: 40px;
    position: relative;
  }
  .container1 > div, .container2 > div, .container3 > div {
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 100%;
    position: absolute;
    animation: bouncedelay 1.2s infinite ease-in-out;
    animation-fill-mode: both;
  }

  .spinner .spinner-container {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .container2 {
    transform: rotateZ(45deg);
  }

  .container3 {
    transform: rotateZ(90deg);
  }

  .circle1 { top: 0; left: 0; }
  .circle2 { top: 0; right: 0; }
  .circle3 { right: 0; bottom: 0; }
  .circle4 { left: 0; bottom: 0; }

  .container2 .circle1 {
    animation-delay: -1.1s;
  }

  .container3 .circle1 {
    animation-delay: -1.0s;
  }

  .container1 .circle2 {
    animation-delay: -0.9s;
  }

  .container2 .circle2 {
    animation-delay: -0.8s;
  }

  .container3 .circle2 {
    animation-delay: -0.7s;
  }

  .container1 .circle3 {
    animation-delay: -0.6s;
  }

  .container2 .circle3 {
    animation-delay: -0.5s;
  }

  .container3 .circle3 {
    animation-delay: -0.4s;
  }

  .container1 .circle4 {
    animation-delay: -0.3s;
  }

  .container2 .circle4 {
    animation-delay: -0.2s;
  }

  .container3 .circle4 {
    animation-delay: -0.1s;
  }
  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
    }
    40% {
        transform: scale(1.0);
    }
  }
</style>
