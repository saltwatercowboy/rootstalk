<template>
    <v-image
      :x="image.x"
      :y="image.y"
      :width="image.width"
      :height="image.height"
      :draggable="true"
      :image="image.uploadedImage"
      @click="handleClick"
      @dragend="handleDragEnd"
      @transformend="handleTransformEnd"
    ></v-image>
  </template>
  
  <script>
  export default {
    props: ['image'],
    methods: {
      handleClick() {
        // handles click on the image
      },
      handleDragEnd(event) {
        const node = event.currentTarget;
        this.$emit('positionChanged', {
          id: this.image.id,
          x: node.x(),
          y: node.y(),
        });
      },
      handleTransformEnd(event) {
        const node = event.currentTarget;
        this.$emit('resizeChanged', {
          id: this.image.id,
          width: node.width(),
          height: node.height(),
        });
      },
    },
  };
  </script>
  
