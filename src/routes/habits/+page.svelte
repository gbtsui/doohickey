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

    const fetchHabits = async () => {
        const response = await fetch(resolve("/api/habits/fetch-like-a-puppy"))
        const data = await response.json();
        console.log(data)
    }

    onMount(() => fetchHabits())

</script>


<div>
    <div>habits / more properly A Semi-Public Record of My Recovery</div>

    <div>
        a public record of the stuff that i try to do every so often.
    </div>

    <div>
        <div>
        </div>
    </div>
</div>

