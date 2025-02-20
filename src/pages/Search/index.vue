<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!-- bread:面包屑 带有x的结构的 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
            <!-- 平台售卖属性面包屑 -->
            <li class="with-x" v-for="(attr, index) in searchParams.props" :key="index">{{attr.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(1)">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-long-arrow-down':isAsc, 'icon-long-arrow-up':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder(2)">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-long-arrow-down':isAsc, 'icon-long-arrow-up':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy=good.defaultImg />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title=good.title>{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @goPageNo="goPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector'
  import { mapState,mapGetters } from 'vuex'
  export default {
    name: 'Search',
    components: {
      SearchSelector
    },
    data() {
      return {
        // 搜索参数
        searchParams: {
          // 一级分类ID
          category1Id: '',
          // 二级分类ID
          category2Id: '',
          // 三级分类ID
          category3Id: '',
          // 分类名称
          categoryName: '',
          // 搜索关键字
          keyword: '',
          // 商品属性的数组
          props: [],
          // 品牌
          trademark: '',
          // 排序方式
          order: '1:desc',
          // 页码
          pageNo: 1,
          // 每页数量
          pageSize: 10
        }
      }
    },
    beforeMount() {
      // 合并搜索参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },
    mounted() {  
      this.getData()    
    },
    computed: {
      ...mapState({
        total: state => state.search.searchList.total
      }),
      ...mapGetters(['goodsList']),
      isOne() {
        return this.searchParams.order.indexOf('1') != -1
      },
      isTwo() {
        return this.searchParams.order.indexOf('2') != -1
      },
      isAsc() {
        return this.searchParams.order.indexOf('asc') != -1
      },
      isDesc() {
        return this.searchParams.order.indexOf('desc') != -1
      }
    },
    watch: {
      // 监听路由的信息是否发生变化 如果变化再次发起请求
      $route(newVal) {
        // 再次发起请求之前 整理发给服务器的参数
        Object.assign(this.searchParams,this.$route.query,this.$route.params)
        // 发起请求
        this.getData()
        // 每一次请求完毕后将1、2、3级分类id置空
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
      }
    },
    methods: {
      // 搜索模块 获取数据
      getData() {
        this.$store.dispatch('getSearchList', this.searchParams)
      },
      // 删除分类的名字
      removeCategoryName() {
        // 把带给服务器的参数置空
        // 带给服务器的参数可有可无: 如果属性值为空还是会把相应的字段带给服务器
        // 如果相应字段为undefined则不会带给服务器
        this.searchParams.categoryName = undefined        
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined   
        // 发起请求
        this.getData()
        // 地址栏也需要修改 进行路由跳转
        // 本意是删除query 如果路径中出现params不应该删除 路由跳转时应该带着
        if(this.$route.params) {
          // 发起请求
          this.$router.push({name: 'search', params: this.$route.params})
        }
      },
      // 删除关键字
      removeKeyword() {
        // 给服务器带的searchParams的keyword参数置空
        this.searchParams.keyword = undefined
        // 再次发起请求
        this.getData()
        // 通知兄弟组件Header清除关键字
        this.$bus.$emit('clear')
        // 如果有query参数 则路由跳转应该带着
        if(this.$route.query) {
          this.$router.push({name: 'search', query: this.$route.query})
        }
      },
      // 品牌自定义事件回调
      tradeMarkInfo(tradeMark) {       
        // 整理品牌参数
        this.searchParams.trademark = `${tradeMark.tmId}:${tradeMark.tmName}`
        // 发起请求
        this.getData()
      },
      // 删除品牌
      removeTrademark() {
        this.searchParams.trademark = ''
        this.getData()
      },
      // 平台售卖属性自定义事件回调
      attrInfo(attr, attrVal) {
        // 整理请求参数
        let prop = `${attr.attrId}:${attrVal}:${attr.attrName}`
        // 没有的属性则添加 已有的则不添加
        if(this.searchParams.props.indexOf(prop) == -1) {
          this.searchParams.props.push(prop)
        }
        // 发起请求
        this.getData()
        console.log(this.searchParams.props)
      },
      // 删除平台售卖属性
      removeAttr(index) {
        // 删除请求参数的对应平台售卖属性
        this.searchParams.props.splice(index, 1)
        // 发起请求
        this.getData()
      },
      // 排序操作
      changeOrder(flag) {
        // flag是一个标记 判断用户点击的是综合还是价格
        let originOrder = this.searchParams.order
        // 获取最开始的状态
        let originFlag = originOrder.split(':')[0]
        let originSort = originOrder.split(':')[1]
        let newOrder = ""
        if(flag == originFlag) {
          newOrder = `${originFlag}:${originSort == 'desc'? 'asc':'desc'}`
        }else {
          newOrder = `${flag}:${'desc'}`
        }
        this.searchParams.order = newOrder
        this.getData()
      },
      // 自定义事件回调函数 当前第几页
      goPageNo(page) {
        // 整理参数
        this.searchParams.pageNo = page
        // 发起请求
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      // margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>