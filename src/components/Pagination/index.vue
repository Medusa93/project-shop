<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('goPageNo', pageNo - 1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('goPageNo', 1)" :class="{active: pageNo == 1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">...</button>

    <button 
    v-for="(page, index) in startNumAndEndNum.end" 
    :key="index" 
    v-show="page >= startNumAndEndNum.start" 
    @click="$emit('goPageNo', page)"
    :class="{active: pageNo == page}">
    {{page}}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">...</button>
    <button v-if="startNumAndEndNum.end < totalPage" 
    @click="$emit('goPageNo', totalPage)"
    :class="{active: pageNo == totalPage}">
    {{totalPage}}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('goPageNo', pageNo + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {};
  },
  props: ['pageNo','pageSize','total','continues'], // 当前页码 每页显示数 数据总数 连续页码数
  computed: {
    // 总页数 
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 开始页和结束页
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this
      // 开始页码 结束页码
      let start = 0, end = 0
      // 如果连续页码数大于总页数
      if(continues > totalPage) {
        start = 1;
        end = totalPage
      }else {
        start = pageNo - parseInt(continues/2)
        end = pageNo + parseInt(continues/2)
        // 开始页码小于1 则调整为1
        if(start < 1) {
          start = 1;
          end = continues
        }
        // 结束页码大于总页码 则调整为总页码数
        if(end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
};
</script>
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background: skyblue;
}
</style>
</style>