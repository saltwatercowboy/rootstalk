<template>
    <div>
        <p class="comp-text">This is placeholder component 1.</p>
        <button class="comp-button" @click="setRegular">Regular</button>
        <button class="comp-button" @click="setItalic">Italic</button>
        <button class="comp-button" @click="setBold">Bold</button>
    </div>
</template>

<script>
export default {}
</script>


<style>

.comp-text {
    font-family: 'iAWriterQuattroS-Regular', sans-serif;
    padding-top: 25px;
    padding-right: 40px;
    padding-left: 20px;
    font-size: 22px;
    float: inherit;
}

.comp-button {
    font-family: 'iAWriterQuattroS-Regular', sans-serif;
    padding-top: 25px;
    font-size: 16px;
    float: inherit;
}

</style>