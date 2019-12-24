<template>
  <div>
    {{ msg }}静态数据可以冻结
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String
    }
  },

  methods: {}
};
</script>
