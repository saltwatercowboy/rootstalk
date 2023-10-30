<template>
    <v-group
        ref="group"
        :x="note.x"
        :y="note.y"
        :width="note.width"
        :height="note.height"
        :draggable="note.draggable"
        @dragend="updatePosition"
    >
      <v-rect
        :width="note.width"
        :height="note.height"
        :fill="note.fill"
      ></v-rect>
      <v-text
        class="note-text"
        fontFamily="'iAWriterQuattroS-Italic', sans-serif"
        ref="text"
        :text="note.content"
        x="10"
        y="40"
        :width="note.width - 20" 
        :height="note.height - 20"
        lineHeight="1.5"
        align="left" 
        @click="showTextarea"   
      ></v-text>
      <v-text
        class="note-text"
        fontFamily="'iAWriterQuattroS-Bold', sans-serif"        
        text="X"
        x="10"
        y="10"
        @click="deleteNote"
      ></v-text>
      <v-circle v-for="(anchor, index) in anchors" :key="index"
        :name="anchor.name"
        :x="anchor.x * note.width"
        :y="anchor.y * note.height"
        radius="5"
        :draggable="true"
        fill="white"
        stroke="black"
        @dragmove="resizeNote"
      ></v-circle>
    </v-group>
  </template>

<script>

export default {
  props: ['note'],

  data() {
    return {

        anchors: [
                { name: 'top-left', x: 0, y: 0 },
                { name: 'top-right', x: 1, y: 0 },
                { name: 'bottom-right', x: 1, y: 1 },
                { name: 'bottom-left', x: 0, y: 1 },
                { name: 'top-middle', x: 0.5, y: 0 },
                { name: 'middle-right', x: 1, y: 0.5 },
                { name: 'bottom-middle', x: 0.5, y: 1 },
                { name: 'middle-left', x: 0, y: 0.5 }
            ]

    };
  },

  methods: {
    deleteNote() {
      this.$emit('delete', this.note.id);
    },

    showTextarea() {
        let konvaText = this.$refs.text.getNode();
        let textPosition = konvaText.getAbsolutePosition();

        let textarea = document.createElement('textarea'); // declaration
        document.body.appendChild(textarea);

        textarea.value = this.note.content;
        textarea.style.position = 'absolute';
        textarea.style.top = textPosition.y + 'px';
        textarea.style.left = textPosition.x + 'px';
        textarea.style.width = this.note.width + 'px';
        textarea.style.height = this.note.height + 'px';

        textarea.focus();

        textarea.addEventListener('blur', () => {
            this.note.content = textarea.value;  // accessing inside the event listener works
            document.body.removeChild(textarea);
            this.$emit('contentChanged');
            });
    },

    updatePosition() {
        const konvaGroup = this.$refs.group.getNode();  // gets underlying konva node
        const newPosition = konvaGroup.position();
        this.note.x = newPosition.x;
        this.note.y = newPosition.y;
        this.$emit('updatePosition', this.note);
        this.$emit('positionChanged');
    },

    resizeNote(event) {
        const anchorName = event.target.name();
        const group = this.$refs.group.getNode();

        const anchorX = event.target.x();
        const anchorY = event.target.y();

        let newWidth, newHeight;

        switch (anchorName) {
            case 'top-left':
                newWidth = this.note.width + (this.note.x - anchorX);
                newHeight = this.note.height + (this.note.y - anchorY);
                this.note.x = anchorX;
                this.note.y = anchorY;
                break;
            case 'top-right':
                newWidth = anchorX - this.note.x;
                newHeight = this.note.height + (this.note.y - anchorY);
                this.note.y = anchorY;
                break;
            case 'bottom-right':
                newWidth = anchorX - this.note.x;
                newHeight = anchorY - this.note.y;
                break;
            case 'bottom-left':
                newWidth = this.note.width + (this.note.x - anchorX);
                newHeight = anchorY - this.note.y;
                this.note.x = anchorX;
                break;
            case 'top-middle':
                newHeight = this.note.height + (this.note.y - anchorY);
                this.note.y = anchorY;
                break;
            case 'middle-right':
                newWidth = anchorX - this.note.x;
                break;
            case 'bottom-middle':
                newHeight = anchorY - this.note.y;
                break;
            case 'middle-left':
                newWidth = this.note.width + (this.note.x - anchorX);
                this.note.x = anchorX;
                break;
        }

        this.note.width = newWidth;
        this.note.height = newHeight;
    }
    
    }

};
</script>

<style scoped>

.note-text {
    font-family: 'iAWriterQuattroS-Bold', sans-serif;
    font-size: 20px;
}

</style>