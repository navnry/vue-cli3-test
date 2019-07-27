<template>
  <div class="film">
    <div class="film-stills">
      <div class="title">剧照</div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide film-yugaopian" v-for="trailers in filmDetailData.trailers">
            <img :src="trailers.medium"/>
            <!--trailers.resource_url-->
          </div>
          <div v-for="photos in filmDetailData.photos" class="swiper-slide">
            <img :src="photos.thumb" alt="">
          </div>
        </div>

      </div>
      <div class="swiper-scrollbar"></div>
    </div>
    <div class="film-desc">
      <div class="title">介绍</div>
      <p>{{filmDetailData.summary}}</p>
    </div>
    <div class="film-actor">
      <div class="title">演员组</div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="writers in filmDetailData.writers">
            <img :src="writers.avatars.medium" alt="">
            <p>{{writers.name}}</p>
          </div>
          <div class="swiper-slide" v-for="actor in filmDetailData.casts">
            <img :src="actor.avatars.small" alt="">
            <p>{{actor.name}}</p>
            <p>演员</p>
          </div>
        </div>
      </div>
    </div>
    <div class="film-discuss">
      <div class="title">豆瓣评价</div>
      <div class="film-discuss-item" v-for="discuss in filmDetailData.popular_comments">
        <div class="film-discuss-userimg clearfix">
          <div class="fl">
            <img :src="discuss.author.avatar" alt="">
          </div>
          <div class="fl">
            <span>{{discuss.author.name}}</span>
            <van-rate
              v-model="discuss.rating.value"
              allow-half
              void-icon="star"
              color="#E48F1F"
              void-color="#eee"
              readonly
              size=".24rem"
            />
            <!--<p>{{discuss.created_at}}</p>-->
          </div>
        </div>
        <div class="film-discuss-content"><p>{{discuss.content}}</p></div>
        <div class="film-discuss-dz">
          <van-icon name="thumb-circle-o"/>
          {{discuss.useful_count}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper'

  export default {
    name: 'film',
    data () {
      return {
        filmId: this.$route.params.id,
        filmDetailData: {},
        photosData: [],
        videoData: []
      }
    },
    mounted () {
      this.$axios({
        method: 'get',
        url: `api/v2/movie/subject/` + this.filmId,
        params: {
          apikey: '0df993c66c0c636e29ecbb5344252a4a',
        }
      }).then(res => {
        console.log(res.data)
        this.filmDetailData = res.data
        this.photosData = res.data.photos
        this.videoData = res.data.blooper_urls
        this.$nextTick(function () {
          this.initSwiper()
        })
      })

    },
    updated () {

    },
    methods: {
      initSwiper () {
        new Swiper('.film-stills .swiper-container', {
          slidesPerView: 'auto',
          freeMode: true,
          speed: 800,
          scrollbar: {
            el: '.film-stills .swiper-scrollbar',
            // hide: true,
          },
          observer: true,
          observeParents: true
        })
        new Swiper('.film-actor .swiper-container', {
          slidesPerView: 'auto',
          freeMode: true,
          speed: 800,
          observer: true,
          observeParents: true
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .film-stills {
    width: 100%;
    /*background: #fff;*/
    position: relative;

    .swiper-container {
      width: 100%;

      .swiper-wrapper {
        .swiper-slide {
          width: auto;
          height: 2.4rem;
          margin-right: .05rem;
          position: relative;

          video, img {
            width: auto;
            height: 100%;
          }
        }

        .swiper-slide.film-yugaopian:before {
          content: '';
          display: block;
          width: .84rem;
          height: .84rem;
          border-radius: 50%;
          background-image: url("https://img3.doubanio.com/f/talion/b6df390a5411896e81ad9be86a97121c17d4c805/pics/card/play-button.png");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }

    .swiper-scrollbar {
      height: .05rem;
      margin: .05rem 0;
    }
  }

  .film-discuss {
    padding: 0 .2rem;

    .film-discuss-item {
      padding: .3rem 0;

      .film-discuss-userimg {
        margin-bottom: .2rem;

        .fl {
          margin-right: .2rem;
          display: flex;
          align-items: center;

          img {
            width: .72rem;
            height: .72rem;
            border-radius: 50%;
          }

          span {
            display: block;
            margin-right: .2rem;
            line-height: .38rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

      }

      .film-discuss-content {
        font-size: .28rem;
        color: #494949;
        line-height: .44rem;
        padding-left: .8rem;
      }

      .film-discuss-dz {
        padding-left: .8rem;
        padding-top: .2rem;
        font-size: .24rem;
        color: #ccc;
      }
    }
  }

  .film-actor {
    .swiper-slide{
      width: auto;
      margin-right: .2rem;
    }
    img {
      width: 2.2rem;
    }
    p{
      text-align: center;
      font-size: .24rem;
      color: #666;
    }
  }
</style>
