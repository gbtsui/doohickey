<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import "@fontsource/noto-serif"
    import {resolve} from "$app/paths";


    let { children } = $props();
</script>

<style>
    :global(body) {
        font-family: "Noto Serif", serif
    }
</style>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav class="w-[95vw] h-[3rem] flex flex-row mx-[2.5vw] my-[0.5rem] px-[1rem] items-center bg-stone-200">
    <a href={resolve("/")} class="hover:text-lg cursor-pointer transition-all">home</a>
</nav>
{@render children()}
