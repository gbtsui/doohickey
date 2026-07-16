<script lang="ts">

import {resolve} from "$app/paths";
</script>

<style>
    .linkywinky {
        transition: all;
        transition-duration: 67ms;
        transition-delay: 67ms;
        height: 1.5rem;
        font-size: 1rem
    }
    .linkywinky:hover {
        color:red;
        font-size: 1.2rem
    }
</style>

<div class="flex flex-col gap-2 text-center items-center ">
    <div class="m-2">
        <h1 class="text-2xl">doohickey</h1>
        <h2 class="text-lg">random stuff.</h2>
    </div>

    <div class="flex flex-col gap-2">
        <div class="text-lg">directory</div>
        <a href={resolve("/why")} class="linkywinky">why</a>
        <a href={resolve("/feature-aspirations")} class="linkywinky">feature-aspirations</a>
        <a href={resolve("/markdown")} class="linkywinky">markdown</a>
        <a href={resolve("/habits")} class="linkywinky">habits</a>
    </div>
</div>