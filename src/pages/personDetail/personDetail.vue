<template>
  <div class="container">
    <div class="top row a-c j-b">
      <div class="personDetail row a-c">
        <div class="img-wrap">
          <img class="person" :src="info.headimgurl" alt="" @click="imgPrew(info.headimgurl)">
        </div>
        <div class="item col j-a">
          <div class="name">{{info.name}}</div>
          <div class="startWrapper row j-c a-c">
            <div class="tip">服务指数</div>
            <van-rate v-model="star" allow-half void-icon="star" void-color="#eee" :color=color readonly size="15" />
            <div class="grade" :style="{'color':color}">{{star}}分</div>
          </div>
          <div class="des row j-c a-c" v-if="info.qualification">{{info.qualification}}</div>
          <div class="des row j-c a-c" v-else>暂无资质</div>
        </div>
      </div>
      <div class="phoneWrapper col j-c a-c">
        <img class="phone" src="./../../assets/img/phoneBig.png" :style="{'background-color':color}" alt="" @click.stop="callPhone(info.mobile)">
      </div>
    </div>
    <div class="detail">
      <div class="item row">
        <div class="title">所在企业</div>
        <div class="des">{{info.companyname ? info.companyname:'暂无数据'}}</div>
      </div>
      <div class="item row">
        <div class="title">工作内容</div>
        <div class="des">{{info.workmain? info.workmain:'暂无数据'}}</div>
      </div>
      <div class="item row">
        <div class="title">从业年限</div>
        <div class="des">{{info.workyear? info.workyear:'暂无数据'}}</div>
      </div>
    </div>
    <div class="detail">
      <div class="item row">
        <div class="title">身份证号</div>
        <div class="des">{{newItem(info.idecode )}}</div>
      </div>
      <div class="item row">
        <div class="title">所获资质</div>
        <div class="des">{{info.qualification? info.qualification:'暂无资质'}}</div>
      </div>
      <div class="item row">
        <div class="title">资质编号</div>
        <div class="des" v-if="info.qcode">{{newItem(info.qcode)}}</div>
        <div class="des" v-else>暂无数据</div>
      </div>
      <div class="item row">
        <div class="title">获得时间</div>
        <div class="des" v-if="info.qgetdate">{{info.qgetdate }}</div>
        <div class="des" v-else>暂无数据</div>
      </div>
    </div>
    <div class="btm row j-c a-c" @click="commentDetail">
      <img class="" src="../../assets/img/message.png" alt="" :style="{'background-color':color}">
      <div :style="{'color':color}">市民评价</div>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
import { emceeapiDetail } from 'api/index'
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      star: 0.1,
      info: '',
      color: localStorage.getItem("color")



    }
  },
  mounted() {
    this._emceeapiDetail()



  },

  methods: {
    newItem(item) {
      if(!item){
        return ""
      }
      return `${item.substring(0, 4)}****${item.substring(item.length - 4)}`;
    },
    // 图片预览
    imgPrew(flag) {
      ImagePreview({
        images: [flag],
        closeable: true,
        closeOnPopstate: true
      });
    },
    _emceeapiDetail() {
      emceeapiDetail({
        id: this.$route.query.id
      }).then(res => {
        console.log('执宾详情', res)
        this.info = res.data.info
        this.star = parseFloat(this.info.score)
        console.log(typeof (this.star))
        console.log(this.star)

      })
    },

    commentDetail() {
      this.$router.push({
        path: './commentDetail',
        query: {
          mid: this.$route.query.id,
          title: this.info.name,
          type: 0
        }
      })

    },
    callPhone(telephone) {
      window.location.href = 'tel:' + telephone
    },

  },
  components: {

  }
}
</script>
<style scoped lang="stylus">
>>>.van-rate__item:not(:last-child)
  padding-right 0 !important
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  background-color #f5f5f5
  .top
    padding 25px 28px 25px 18px
    background-color #ffffff
    margin-bottom 9px
    .personDetail
      .img-wrap
        width 139px
        height 160px
        overflow hidden
        .person
          width 139px
          min-height 160px
      .item
        margin-left 19px
        height 139px
        .name
          color #111111
          font-size 31px
        .des
          color #919191
          font-size 25px
          border 2px solid #919191
          border-radius 16px
          width 200px
          height 35px
          margin-top 10px
        .startWrapper
          font-size 27px
          .tip
            color #919191
            margin-right 5px
          img
            width 29px
            height 27px
            margin-left 3px
          .grade
            color #1ead55
            margin-left 2px
    .phoneWrapper
      color #919191
      font-size 27px
      .phone
        width 75px
        height 75px
        margin-bottom 20px
  .detail
    padding 28px
    background-color #ffffff
    margin-top 1px
    .item
      font-size 30px
      margin-bottom 25px
      .title
        color #919191
        width 120px
        white-space nowrap
      .des
        color #252525
        margin-left 42px
  .btm
    color #5aa967
    font-size 31px
    height 99px
    background-color #ffffff
    margin 17px auto
    img
      width 31px
      margin-right 15px
      margin-top 5px
</style>