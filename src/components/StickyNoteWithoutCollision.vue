<template>
    <div class="sticky-note">
      <textarea v-model="note.content"></textarea>
      <button class="delete-btn" @click="deleteNote">X</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['note'],
    methods: {
      deleteNote() {
        this.$emit('delete', this.note.id);
      }
    }
  };
  </script>  