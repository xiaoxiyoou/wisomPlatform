<template>
  <div class="container">
    <div v-for="(item,index) in list" :key="index">
      <div class="item-content" v-for="(itemTwo,indexTwo) in item.renlist" :key="indexTwo">
        <div class="item-wrapper row van-hairline--bottom">
          <div>
            <img class="pic" :src="item.imgurl" alt="" v-if="item.tempid != 0">
            <img class="pic" :src="item.tempurl" alt="" v-else>
          </div>
          <div class="list col j-b">
            <div class="name">{{itemTwo.name}}的追思纪念堂</div>
            <div class="des">{{itemTwo.birthday|moment}}-{{itemTwo.deathdate |moment}}</div>
            <div class="detail row" :style="{'color':color}">
              <div class="item row a-c">
                <img class="" src="./../../../assets/img/flower.png" :style="{'background-color':color}">
                <div>{{item.flower}}</div>
              </div>
              <div class="item row a-c">
                <img class="" src="./../../../assets/img/msg.png" :style="{'background-color':color}">
                <div>{{item.msgcount}}</div>
              </div>
              <div class="item row a-c">
                <img class="" src="./../../../assets/img/look.png" :style="{'background-color':color}">
                <div>{{item.look}}</div>
              </div>
            </div>
          </div>
        </div>
        <van-cell :value="itemTwo.birthday |moment" is-link @click="modify(item.id)">
          <template #title>
            <span class="custom-title">生日</span>
          </template>
        </van-cell>
        <van-cell :value="itemTwo.deathdate |moment" is-link @click="modify(item.id)">
          <template #title>
            <span class="custom-title">忌日</span>
          </template>
        </van-cell>
      </div>
    </div>
    <noMessage :noinfoShow="noinfoShow" />

  </div>

</template>
<script type="text/ecmascript-6">
import { list } from 'api/index'
import noMessage from 'components/noMessage/noMessage'
export default {
  data() {
    return {
      list: [],
      noinfoShow: false,
       color:localStorage.getItem("color"), 



    }
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    this._list()

  },
  methods: {
    // 编辑
    modify(id) {
      this.$router.push({
        path: '/modify',
        query: {
          carid: id
        }
      })
    },
    _list() {
      list({
        action: 'list'
      }).then(res => {
        console.log('追思卡', res)
        this.list = res.data.list

        console.log(this.renlist)
        if (res.data.count) {
          this.noinfoShow = false
        } else {
          this.noinfoShow = true
        }
      })
    },

  },
  components: {
    noMessage

  }
}
</script>
<style scoped lang="stylus">
.container
  position absolute
  top 0px
  width 100%
  height 100%
  bottom 0
  .item-content
    margin-bottom 25px
    .item-wrapper
      background-color #ffffff
      padding 23px 50px 23px 30px
      .pic
        width 135px
        height 135px
        border-radius 5px
        margin-right 26px
      .list
        height 135px
      .name
        font-size 31px
        color #111111
      .des
        font-size 28px
        color #919191
      .detail
        color #5aa967
        .item
          font-size 28px
          margin-right 10px
          width 100px
          img
            width 36px
            margin-right 10px
</style>