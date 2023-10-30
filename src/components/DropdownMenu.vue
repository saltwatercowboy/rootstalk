<template>
    <div @mouseenter="isOpen = true" @mouseleave="isOpen = false" class="dropdown">
        Menu
        <div v-if="isOpen" class="dropdown-content">
            <a href="#" @click.prevent="setConfig(0)">Use First Configuration</a>
            <a href="#" @click.prevent="setConfig(1)">Use Second Configuration</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        };
    },
    methods: {
        setConfig(index) {
            this.$emit('switch-config', index);
        }
    }
}
</script>

<style scoped>
.dropdown {
    font-family: 'iAWriterQuattroS-Bold', sans-serif;
    padding-top: 40px;
    padding-right: 40px;
    padding-left: 20px;
    font-size: 22px;
    display: inline-block;
}

.dropdown-content {
    display: none; /* initially hidden */
    position: absolute;
    background-color: #f9f9f9;
    min-width: 80px;
    z-index: 1;
    flex-direction: column; 
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); 
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block; 
.dropdown:hover .dropdown-content {
    display: block; /* When hovering over the dropdown, the content will show as a block (column) */
}
</style>
