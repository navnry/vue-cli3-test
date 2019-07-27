<template>
  <div class="home">
    <div class="film-container" v-infinite-scroll="getFilmData">
      <div class="film-item" v-for="item in filmData" :key="item.index" @click="gotopage(item.id)">
        <div class="film-pic">
          <img :src="item.images.small" alt="">
        </div>
        <div class="film-info">
          <div class="film-title">{{item.title}}</div>
          <div class="film-genres">类型：{{item.genres}}</div>
          <div class="film-casts">主演：<span v-for="actor in item.casts" :key="actor.id">{{actor.name}}  </span></div>
          <div class="film-rating">评分：
            <span v-if="(item.rating.average)!=0">{{item.rating.average}}</span>
            <span v-if="(item.rating.average)==0">暂无评分</span>
          </div>
          <div class="film-durations">影片时长：{{item.durations[0]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import getFilmList from '../api/getFilmList'

  export default {
    name: 'home',
    data () {
      return {
        filmData: [],
      }
    },
    mounted () {
      getFilmList().then(res=>{
        console.log(res)
      })
    },
    methods: {
      getFilmData () {
        //3732800
        let startNum = this.filmData.length
        this.loading = true
        this.$axios({
          method: 'get',
          url: 'api/v2/movie/in_theaters',
          params: {
            apikey: '0df993c66c0c636e29ecbb5344252a4a',
            start: startNum,
            count: 5
          }
        }).then(res => {
          this.filmData = this.filmData.concat(res.data.subjects)
        })
      },
      gotopage (id) {
        this.$router.push({
          name: 'film',
          params: {
            id: id
          }
        })
      }
    },
  }
</script>
<style lang="less">
  .film-container {
    padding: 0 .2rem;

    .film-item {
      border-bottom: 1px solid #ccc;
      padding: .2rem 0;
      display: flex;

      .film-pic {
        flex: 1;
        height: 2.48rem;
      }

      .film-info {
        width: 5.3rem;
        padding-left: .2rem;

        .film-title {
          font-weight: bold;
          margin-bottom: .1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .film-genres {
          font-size: .26rem;
          color: #666;
          line-height: .48rem;
        }

        .film-casts {
          font-size: .26rem;
          color: #666;
          line-height: .48rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .film-rating {
          font-size: .26rem;
          color: #666;
          line-height: .48rem;

          span {
            color: #ff0000;
          }
        }

        .film-durations {
          font-size: .26rem;
          color: #666;
          line-height: .48rem;
        }
      }
    }

    p {
      margin: .2rem 0;
      text-align: center;
    }
  }
</style>
