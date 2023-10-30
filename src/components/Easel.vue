<template>
    <div class='header'>
        <img src="/src/assets/logo.png" alt="logo" />
        <h1 id="headname">Rootstalk</h1>
        <h1 id="headtext" href="localhost:5173">Home</h1>
        <DropdownMenu @switch-config="setActiveComponent"/>
        <button @click="newNote">Add Note</button>
        <button @click="openImageUpload">Add Image Note</button>
        <input type="file" ref="imageUploader" @change="uploadImage" style="display: none;">
        <form action="submit" @submit.prevent="$emit('change')">
            <input type="number" v-model="inputWidth">
            <input type="number" v-model="inputHeight">
            <button @click="adjNoteSize(inputHeight, inputWidth)">Adjust Note Size</button>
        </form>
        <component @setStyle="updateTextStyle" :is="activeComponent"></component>
    </div>
    <v-stage :config="boardSpace">
        <v-layer>
            <v-rect :config="background"></v-rect>
        </v-layer>
        <v-layer>
            <note
                v-for="noteItem in notes"
                :key="noteItem.id"
                :note="noteItem"
                @delete="deleteNote"
                @contentChanged="saveNotes"
                @positionChanged="saveNotes"
            ></note>
        </v-layer>
        <v-layer>
            <ImageNote
                v-for="imageItem in imageNotes"
                :key="imageItem.id"
                :image="imageItem"
                @delete="deleteImageNote"
                @positionChanged="saveImageNotes"
            ></ImageNote>
        </v-layer>
    </v-stage>
</template>

<script>

import axios from 'axios';

import note from './Note.vue';
import ImageNote from './ImageNote.vue';
import DropdownMenu from './DropdownMenu.vue'
import PlaceholderComponentOne from './PlaceholderComponentOne.vue';
import PlaceholderComponentTwo from './PlaceholderComponentTwo.vue';

export default {

    components: { 
        note, 
        DropdownMenu, 
        PlaceholderComponentOne, 
        PlaceholderComponentTwo, 
        ImageNote 
    },

    data() {

        return {
            boardSpace: {
                width: window.innerWidth - 20,
                height: window.innerHeight - 90
            },
            background: {
                width: window.innerWidth - 20,
                height: window.innerHeight - 90,
                fillPatternImage: null
            },
            gridGeometry: {
                width: 17,
                height: 1,
                fill: 'red',
                repeat: 17
            },

            backGrid: null,

            notes: [],
            imageNotes: [],
            
            noteWidth: 250,
            noteHeight: 250,
            inputWidth: 250,   // for the input form
            inputHeight: 250,

            activeComponent: 'PlaceholderComponentOne',

            textStyle: 'normal'

        };
    },

    methods: {

        updateGridDimensions() {
            this.background.width = window.innerWidth - 20;
            this.background.height = window.innerHeight - 90;
            this.boardSpace.width = window.innerWidth - 20;
            this.boardSpace.height = window.innerHeight - 90;
        },

        adjNoteSize(height, width) {
            this.noteHeight = height;
            this.noteWidth = width;
        },

        newNote() {
            this.notes.push({
                id: Date.now(),
                width: this.noteWidth,
                height: this.noteHeight,
                x: 200,
                y: 200,
                fill: 'yellow',
                draggable: true,
                content: 'Test text'
            });
            this.saveNotes();
        },

        deleteNote(id) {
            this.notes = this.notes.filter(note => note.id !== id);
            this.saveNotes();
        },

        async saveNotes() {
            try {
                await axios.post('/api/notes', { notes: this.notes });
                console.log('Notes sent to server');
            } catch (error) {
                console.error('Error saving notes:', error);
            }
        },

        openImageUpload() {
            this.$refs.imageUploader.click();
        },

        uploadImage(event) {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('image', file);

                axios.post('/api/uploadImageNote', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    const imageUrl = response.data.path; // this will now be a complete URL
                    this.addImageNote(imageUrl);
                }).catch(error => {
                    console.error('Error uploading image:', error);
                });
            }
        },

        addImageNote(imageUrl) {
            const img = new Image();
            img.onload = () => {
                this.imageNotes.push({
                    id: Date.now(),
                    width: img.width,
                    height: img.height,
                    x: 200,
                    y: 200,
                    imageURL: imageUrl,
                    uploadedImage: img
                });
            };
            console.log("Image URL:", imageUrl);
            img.src = imageUrl;
            img.onerror = (error) => {
                console.error("Error loading the image:", error);
            };
        },

        deleteImageNote(id) {
            this.imageNotes = this.imageNotes.filter(image => image.id !== id);
            this.saveImageNotes();
        },

        async saveImageNotes() {
            try {
                await axios.post('/api/imageNotes', { imageNotes: this.imageNotes });
                console.log('Image notes sent to server');
            } catch (error) {
                console.error('Error saving image notes:', error);
            }
        },

        setActiveComponent(index) {
            const components = ['PlaceholderComponentOne', 'PlaceholderComponentTwo'];
            this.activeComponent = components[index];
        },

        updateTextStyle(style) {
            switch(style) {
                case 'regular':
                this.textStyle = 'normal';
                break;
                case 'italic':
                this.textStyle = 'italic';
                break;
                case 'bold':
                this.textStyle = 'bold';
                break;
                default:
                this.textStyle = 'normal';
                }
        }
    },

    async mounted() {
        
        try {
            const response = await axios.get('/api/notes');
            this.notes = response.data.notes;
            console.log(this.notes);
            console.log('Notes loaded from server');
        } catch (error) {
            console.error('Error loading notes:', error);
        }

        const backGrid = new Image();
        backGrid.onload = () => {
            this.backGrid = backGrid;
            this.background.fillPatternImage = backGrid;
        };
        backGrid.src = "./src/assets/grid.png";

        window.addEventListener('resize', this.updateGridDimensions);

        this.updateGridDimensions();
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.updateGridDimensions);
    }

}
</script>

<style>

.header {
    min-height: 60px;
    border-bottom: 4px solid black;
    display: flex;
    padding-bottom: 6px;
}

.header img {
  float: left;
  width: 100px;
  height: 100px;
  padding-left: 10px;
}

#headname {
    font-family: 'iAWriterQuattroS-Bold', sans-serif;
    padding-top: 10px;
    padding-right: 40px;
    padding-left: 40px;
    float: inherit;
}

#headtext {
    font-family: 'iAWriterQuattroS-Regular', sans-serif;
    padding-top: 25px;
    padding-right: 40px;
    padding-left: 20px;
    font-size: 22px;
    float: inherit;
}

</style>
