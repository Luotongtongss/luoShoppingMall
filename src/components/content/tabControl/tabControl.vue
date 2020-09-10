<template>
  <div class="tabControl">
    <div 
      class="controlItem" 
      :class="{activate: curtB == inx}" 
      v-for="(item, inx) in tabControlData" :key="inx"
      @click="activateItem(inx)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  props: {
    tabControlData: {
      type: Array,
      deftault: []
    }
  },
  data () {
    return {
      curtB: 0
    }
  },
  methods: {
    activateItem (inx) {
      this.curtB = inx;
      this.$emit('tabCut', inx)
    }
  }
}
</script>

<style lang="less" scoped>
  .tabControl {
    display: flex;
    text-align: center;
    .controlItem {
      flex: 1;
      height: 40px;
      line-height: 40px;
      span {
        padding: 5px;
      }
    }
    .activate {
      color: #ff6699;
      span {
        border-bottom: 2px solid #ff6699
      }
    }
  }
</style>