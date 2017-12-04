<template>
  <div>
    <load-mask ref="loadmask"></load-mask>
    <banner-swiper :bannerList="this.school.bannerList" @select="selectSeries"></banner-swiper>
    <school-list :schoolClass="school.class" @add="_drop" @select="selectSeries"></school-list>
    <shop-cart ref="shopcart" :selectSchool="selSchool" :xtList="school.xtList" :havewx="school.havewx ? 1:0" :coins="school.coins ? school.coins : 0" :huaweipay="school.huaweipay"></shop-cart>
  </div>
</template>

<script>
  import banner from './Banner.vue';
  import schoollist from './SchoolList.vue';
  import shopcart from './ShopCart.vue';
  import loadmask from './LoadMask.vue';
  export default {
    name: 'app',
    data() {
      return {
        school: {},
//        selSeriesId: 1,
        seriesInfo: {}
      };
    },
    created() {
//      axios.post(url[, data[, config]])
//      // 发送 POST 请求
//      axios({
//        method: 'post',
//        url: '/user/12345',
//        data: {
//          firstName: 'Fred',
//          lastName: 'Flintstone'
//        }
//      });

      // axios ajax请求
      this.$http.get('../../school.json').then((respone) => {
        this.$refs.loadmask.colseLoadmask();
        this.school = Object.assign({}, this.school, respone.data);
        console.log('首页data:', this.school);
      }).catch(function (e) {
        console.log(e);
      });

      // vue-resource jsonp请求
//      this.$http.jsonp('http://jamie2.wxxbl.youban.com/app/school/index.jsonp',
//        { // 请求参数
//          params: {},
//          jsonp: 'jsoncallback'
//        }).then(function(res) {
//        this.$refs.loadmask.colseLoadmask();
//        this.school = Object.assign({}, this.school, JSON.parse(res.bodyText));
//        console.log('首页data:', this.school);
//      }, function() {
//         console.log(1);
//      });
    },
    computed: {
      selSchool() {
        let selschool = [];
        if (this.school.class) {
          this.school.class.forEach((myschool) => {
            if (myschool.buycount) {
              selschool.push(myschool);
            }
          });
        }
        return selschool;
      },
      getSeriesInfo() {
        return this.seriesInfo;
      }
    },
    methods: {
      _drop(event) {
//        console.log('app:target', event);
        this.$refs.shopcart.dropBall(event);
      },
      selectSeries(seriesId) {
        console.log('index seriesid:', seriesId);
        this.ajaxSeries(seriesId);
      },
      ajaxSeries(seriesId) {
        console.log('加载中...');
        this.$refs.loadmask.showLoadmask();
         // axios => ajax请求
        this.$http.get('../../series.json').then((m) => {
          console.log('加载完毕');
          this.$refs.loadmask.showLoadmask();
          this.seriesInfo = Object.assign({}, this.seriesInfo, m.data);
            this.$refs.series.showSeries();
        });
        console.log('seriesId:', seriesId);
        // vue-resource jsonp请求
//      this.$http.jsonp('http://jamie2.wxxbl.youban.com/app/school/detail.jsonp',
//        { // 请求参数
//          params: {'as': seriesId, 'debug': '9579141'}, // 3014982 9579141
//          jsonp: 'jsoncallback'
//        }).then(function(res) {
//        this.$refs.loadmask.showLoadmask();
//        console.log('详情页', JSON.parse(res.bodyText));
//        this.seriesInfo = Object.assign({}, this.seriesInfo, JSON.parse(res.bodyText));
//        this.$refs.series.showSeries();
//      }, function() {
//         console.log(1);
//      });
      }
    },
    components: {
      'banner-swiper': banner,
      'school-list': schoollist,
      'shop-cart': shopcart,
      'load-mask': loadmask
    }
  };
</script>

<style>

</style>
