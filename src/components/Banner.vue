<template>
  <div class="banbox">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="banner in bannerList" class="swiper-slide">
          <a href="javascript:;" @click="showSeries(banner.url)"><img :src="banner.image" width="100%"></a>
        </div>
        <!--<div class="swiper-slide">-->
          <!--<a href="http://wxxbl.youban.com/app/school/detail?as=45">-->
            <!--<img src="http://udata.youban.com/webimg/i597fd5e81c290.jpg" width="100%">-->
          <!--</a>-->
        <!--</div>-->
        <!--<div class="swiper-slide">-->
          <!--<a href="http://wxxbl.youban.com/app/school/detail?as=45">-->
            <!--<img src="http://udata.youban.com/webimg/i597fd5e81c290.jpg" width="100%">-->
          <!--</a>-->
        <!--</div>-->
        <!--<div class="swiper-slide">-->
          <!--<a href="http://wxxbl.youban.com/app/school/detail?as=45">-->
            <!--<img src="http://udata.youban.com/webimg/i597fd5e81c290.jpg" width="100%">-->
          <!--</a>-->
        <!--</div>-->
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from '../../static/js/swiper.min.js';
  export default {
    name: 'banner',
    props: {
      bannerList: {
        type: Array
      }
    },
    data() {
      return {
      };
    },
    created() {
    },
    mounted() {
      // 轮播图 --延缓加载
      setTimeout(function () {
        let swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 2500
        });
      }, 300);
    },
    methods: {
      showSeries(url) {
        if (url.match(/.detail\?as=[\d]/)) {
          let seriesId = url.split('?')[1].split('=')[1];
//          this.$emit('select', seriesId);
          this.$router.push({path: 'detail', query: {as: seriesId}});
        } else {
          location.href = url;
        }
      }
    }
  };
</script>

<style rel="stylesheet/css">
  @import "../../static/css/swiper.min.css";
</style>
