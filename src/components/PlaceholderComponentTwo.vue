<template>
    <div>
        <p class="comp-text">This is placeholder component 2.</p>
    </div>
</template>

<script>
export default {

    methods: {
    setRegular() {
      this.$emit('setStyle', 'regular');
    },
    setItalic() {
      this.$emit('setStyle', 'italic');
    },
    setBold() {
      this.$emit('setStyle', 'bold');
    }
  }

}
</script>

<style>

.comp-text {
    font-family: 'iAWriterQuattroS-Regular', sans-serif;
    padding-top: 25px;
    padding-right: 40px;
    padding-left: 20px;
    font-size: 22px;
    float: right;
}

</style>