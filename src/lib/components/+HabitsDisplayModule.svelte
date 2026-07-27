<script lang="ts">
    import {SvelteDate, SvelteMap} from "svelte/reactivity";

    const {habitObject}: { habitObject: Habit } = $props()
    const {name, description, entries, weeklyGoal} = $derived(habitObject)

    //we'll all be happy till we die
    //gintlemen's club OH WHY


    //the light inside me is getting dim

    //ts will have 30 days' worth of data or less

    const last30Days = $derived((() => {
        const days = []
        const aujourdhui = new SvelteDate()
        aujourdhui.setHours(23, 59, 59, 999)

        for (let i = 29; i >= 0; i--) {
            const date = new SvelteDate(aujourdhui)
            date.setDate(date.getDate() - i)
            date.setHours(0, 0, 0, 0)
            days.push(date)
        }
        return days
    })())
    //genuinely why is ts notation so weird
    //ah yes. please give me a f((() => {})())
    //statements dreamed up by the utterly deranged

    const completedDates = $derived((() => {
        const dateMap = new SvelteMap<string, boolean>()
        entries.forEach(entry => {
            const entryDate = new SvelteDate(entry.created_at)
            entryDate.setHours(0, 0, 0, 0)
            const dateKey = entryDate.toDateString()
            dateMap.set(dateKey, true)
        })
        return dateMap
    })())

    function formatDate(date: Date) {
        return date.toLocaleDateString('en-CA', {weekday: 'short', month: 'short', day: 'numeric'})
    }

    const today: SvelteDate = new SvelteDate((new SvelteDate()).setHours(0,0,0,0)) //good lord this disgusts me
</script>

<div class="w-[80vw] flex flex-col">
    <div class="text-lg">
        {name} / weekly: {weeklyGoal.toString()}
    </div>
    <div class="text-sm">
        {description}
    </div>
    <div class="flex flex-col gap-2 mt-4">
        <div>last 30 days</div>
        <div class="flex flex-row flex-wrap gap-1">
            {#each last30Days as date (date)}
                <div
                        class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                    {completedDates.has(date.toDateString()) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                    {date.toDateString() === today.toDateString() ? 'ring-2 ring-blue-500' : ''}"
                        title="{formatDate(date)}: {completedDates.has(date.toDateString()) ? 'Completed' : 'Not completed'}"
                >
                    {date.getDate()}
                </div>
            {/each}
        </div>
        <div class="flex flex-row gap-4 text-xs text-gray-500 mt-2">
            <div class="flex items-center gap-1">
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span>completed</span>
            </div>
            <div class="flex items-center gap-1">
                <div class="w-3 h-3 rounded-full bg-gray-200"></div>
                <span>not completed</span>
            </div>
            <div class="flex items-center gap-1">
                <div class="w-3 h-3 rounded-full bg-green-500 ring-2 ring-blue-500"></div>
                <span>today</span>
            </div>
        </div>

    </div>
</div>