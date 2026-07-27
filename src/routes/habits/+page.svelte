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

    //TODO: tomorrow, implement a zod thingy to take the raw array and validate it against a schema to like fit the data to a Habit then map those Habit objects

    const fetchHabits = async () => {
        const response = await fetch(resolve("/api/habits/fetch-like-a-puppy"))
        //const response = await fetch(resolve("/api/habits/entry"))
        const data = await response.json();
        console.log(data)

        return data.data
    }


    onMount(() => fetchHabits())

    const habits = $derived(onMount(() => {return fetchHabits()})) //how tf do i do this bru
</script>


<div>
    <div>habits / more properly A Semi-Public Record of My Recovery</div>

    <div>
        a public record of the stuff that i try to do every so often.
    </div>

    <div class="mt-2 w-[90vw] mx-[10vw] flex flex-col gap-4">

    </div>
</div>

