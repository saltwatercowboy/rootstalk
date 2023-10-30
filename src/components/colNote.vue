<script>

export default {
    props: ['note', 'colNote'],
    data() {
        return {

            colNote: {
                            
                id: 0,
                width: 250,
                height: 250,
                x: 400,
                y: 400,
                fill: 'blue',
                draggable: true,
            
            }
        }
    }
}
</script>

<template>
    <div
      class="col-note"
      :style="{ width: colNote.width + 'px', height: colNote.height + 'px', backgroundColor: colNote.fill }"
      @dblclick="deleteColNote"
    >
    </div>
  </template>
