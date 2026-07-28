<script lang="ts">
    /*
    should be a modular system, for any given array of different habits it should render accordingly

    Habit object
    - description
    - EITHER weekly capacity OR daily thingy?
    - entries

    Entry object (linked to Habit)
    - date-time
    - habit ID

    workflow;
    api posts to drizzle/db
    ts page can fetch from api to get Habits and Entries (one call per pageload?)
     */


    import {resolve} from "$app/paths";
    import {onMount} from "svelte";
    //import {ListOfHabitsSchema} from "$lib/server/zod/schema";
    import HabitsDisplayModule from "$lib/components/HabitsDisplayModule.svelte";

    let habits = $state<Array<Habit>>([])
    let isLoading = $state(true)
    let oopsie_error = $state<string | null>(null)

    const fetchHabits = async () => {
        try {
            const response = await fetch(resolve("/api/habits/fetch-like-a-puppy"))
            //const response = await fetch(resolve("/api/habits/entry"))
            const data = await response.json();
            console.log(data)

            /*
            const validated = ListOfHabitsSchema.safeParse(data.data)

            if (!validated.success) {
                console.error("oopsie poopsie! validation error:", validated)
                oopsie_error = "failed to load habits data :("
                return validated.error
            } //ugahgajkad what do i even do here

            habits = validated.data
            //return validated.data as Habit[]

             */
        } catch (error) {
            console.error("oopsie poopsie! fetch failure, client is not a good puppy: ", error)
            oopsie_error = "failed to fetch habits data :("
        }
    }

    //又唔見我「鬧」幾「鬧」就可以改善社會。

    onMount(() => fetchHabits())

    //const habits = $derived(onMount(() => {return fetchHabits()})) //how tf do i do this bru
</script>


<div>
    <div>habits / more properly A Semi-Public Record of My Recovery</div>

    <div>
        a public record of the stuff that i try to do every so often.
    </div>

    {#if isLoading}
        <div class="flex justify-center items-center">
            <div>loading.</div>
        </div>
    {:else if oopsie_error}
        <div class="p-4 text-red-700">
            {oopsie_error}
            <button
                    onclick={fetchHabits}
                    class="ml-4 underline hover:no-underline"
            >
                retry?
            </button>
        </div>
        <!--im writing this and i deadass gotta piss so bad rn-->
    {/if}
    <div class="mt-2 w-[90vw] mx-[10vw] flex flex-col gap-4">
        {#each habits as habitInstanceObjectRaghghgh (habitInstanceObjectRaghghgh.id)}
            <HabitsDisplayModule habitObject={habitInstanceObjectRaghghgh}></HabitsDisplayModule>
        {/each}
    </div>
</div>

