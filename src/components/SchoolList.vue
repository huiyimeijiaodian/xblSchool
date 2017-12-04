<template>
  <div class="selection">
    <div v-for="sclass in schoolClass" class="list">
      <div class="img" @click="selSeries(sclass.list[0])">
        <router-link :to="{path:'detail',query: {as:sclass.list[0]}}">
          <img :src="sclass.image" />
        </router-link>
      </div>
      <div class="centext">
        <div class="textNubmer">
          <div class="fcomlayer">
            <div class="plan">
              <div class="proportion" :style="'width:'+(sclass.receiveCount/sclass.allCount) * 100+'%;'"></div>
            </div>
            <h4 class="yibuyn"><span>已购买</span>{{sclass.receiveCount}}/{{sclass.allCount}}</h4>
          </div>
        </div>
        <h3>{{sclass.subtitle}}</h3>
      </div>
      <add-cart @addcart="addSchool" :sclass="sclass"></add-cart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import addCart from './AddCart.vue';
  export default {
    name: 'schoolList',
    props: {
      schoolClass: {
        type: Array
      }
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {
      addSchool(event) {
//        console.log('list target:', event);
        this.$emit('add', event);
      },
      selSeries(seriesId) {
//        console.log('detailId:', seriesId);
//        this.$emit('select', seriesId);
      }
    },
    components: {
      'add-cart': addCart
    }
  };
</script>

<style rel="stylesheet/css">
  .selection{margin-top: 0.5rem;background: #fff;padding: 0.8rem 3% 5rem 3%;}
  .selection a{display: block}
  .selection h2{padding: 0 3% 0 3%;}
  .selection .list{position: relative; border:1px solid #dadada;width:48%; display: inline-block; border-radius: 0.4rem;    margin:0 0.5rem 0.5rem 0;padding-bottom: 1rem;vertical-align: bottom;}
  .selection .list:nth-child(2n){margin-right:0;}
  .selection .list .img{display: initial;}
  .selection .list .img img{width:100%;min-height: 104px;  height: auto; vertical-align: middle; display: block;border-radius: 0.4rem 0.4rem 0rem 0rem;}
  .selection .list .centext{padding: 0.5rem 0.5rem 0rem;}
  .selection .list .centext .textNubmer{position: relative; margin: 2px 0px 4px;}
  .selection .list .centext h3{color: #333; font-size: 0.9rem; font-weight: bold; height: 3rem;}
  .selection .list .centext p{margin-bottom:1rem;color: #808080}
  .selection .list .centext .plan{background:#e5f9f6; padding:.1rem 0; height:3px; border-radius: 1rem; position: relative;  margin-top: .1rem;width:100%; display: inline-block; border: 1px solid #02c6a6;}
  .selection  .list .centext .proportion{position: absolute; left:0; width:15%; border-radius: 1rem; background: #00c5a5; height:100%; top:0;}
  .yibuyn{position: absolute; right: 0.5rem;top: 2px; color:#959597;font-size: 12px;}
</style>
