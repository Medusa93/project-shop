<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="(checked = cart.isChecked == 1)"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('mins', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length > 0" @change="updateAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle.js";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 获取购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改某一个产品的个数  节流
    handler: throttle(async function (type, disNum, cart) {
      // type 区分这三个元素
      // disNum形参: + 变化量(1) - 变化量(-1) input最终的个数不是变化量
      // cart 哪一个产品 [身上有id]
      // 向服务器发起请求 修改数量
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "mins":
          // 产品个数大于1 才能-1
          // 如果产品个数小于等于1 则带给服务器0
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 如果输入的值不合法 或者小于1 则带给服务器0
          if (isNaN(cart.skuNum) || cart.skuNum < 1) {
            disNum = 0;
          } else {
            // 输入合法(取整) 带给服务器的变化量 用户输入的 - 产品起始的个数
            disNum = parseInt(disNum) - cart.skuNum;
          }
      }
      try {
        // 修改成功
        await this.$store.dispatch("reqAddOrUpdateShopCar", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再一次获取最新的数据进行展示
        this.getData();
      } catch (err) {
        console.log(err);
      }
    }, 1000),
    // 删除某一个产品
    async deleteCartById(cart) {
      await this.$store.dispatch("deleteCartBySkuId", cart.skuId);
      // 再次发起请求 获取最新数据展示
      this.getData();
    },
    // 修改某个产品的勾选状态
    async updateChecked(cart, e) {
      // 带给服务器的参数 isChecked 不是布尔值 应该是0或1
      try {
        // 如果修改成功则再次获取购物车最新数据
        const isChecked = e.target.checked ? "1" : "0";
        const res = await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        });
        this.getData();
      } catch (err) {
        alert(err.message);
      }
    },
    // 删除所有选中商品
    async deleteAllChecked() {
      try {        
        await this.$store.dispatch("deleteAllChecked");
        // 获取最新购物车数据
        this.getData();
      } catch (err) {
        alert(err.message);
      }
    },
    // 修改全部商品勾选状态
    async updateAllChecked(e) {
      try{
        const isChecked = e.target.checked? '1' : '0'
        await this.$store.dispatch('updateAllChecked', isChecked)
        this.getData()
      }catch(err) {
        alert(err.message)
      }
    }
  },
  computed: {
    // 购物车数据
    ...mapGetters(["cartList"]),
    // 计算购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        item.isChecked == 1?sum += item.skuNum * item.skuPrice : sum;
      });
      return sum;
    },
    // 全选
    isAllCheck() {
      // every函数 只要有一个元素为false 则返回false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>