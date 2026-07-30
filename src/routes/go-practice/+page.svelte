<script lang="ts">
    //import type {EventHandler} from "svelte/elements";
    import {enhance} from "$app/forms";

    /*
    const test: EventHandler = async (form: FormData): Promise<void> => {
        const response = await fetch(`/lets-go/test`, {
            method: "POST",
            body: JSON.stringify({
                "body": "two plus two is four minus one that's three quick maths",
                "silly_payload": form.get("silly_payload")
            }),
        })

        const result = await response.json()
        console.log(result)
    }

     */

    let result = $state("")
    let loading = $state(false)
    let error = $state("")

    async function handleSubmit(formData: FormData) {
        try {
            loading = true;

            const response = await fetch('?/test', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.type === 'failure') {
                error = data.data?.error || "request failure!";
            } else {
                result = JSON.stringify(data, null, 2);
            }
        } catch (e) {
            error = "network error! " + e.message
        } finally {
            loading = false;
        }

    }
</script>

<style>
    .jawn {
        padding: 2rem;
        background: oklch(86.9% 0.005 56.366); /*stone 300*/
        width: 90vw;
    }
</style>

<div>
    <div>go practice / more properly an excuse to learn go</div>
    <div>this stupid fricking language is something reportedly awesome that my hb Guac Schere never ceases to glaze. so
        i'm practicing writing a small backend in it. also, rare footage of me putting beyond the bare minimum effort of
        styling.
    </div>

    <div class="text-center flex flex-col w-full items-center">
        <div>result</div>
        <div>
            {#if error}
                <div class="mt-4 p-4 min-w-[10vw] bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            {:else if result}
                <div class="mt-4 p-4 min-w-[10vw] bg-gray-100 rounded">
                    <pre>{result}</pre>
                </div>
            {/if}
        </div>
    </div>

    <div class="w-[90vw] mx-[5vw] flex flex-col gap-5">
        <div class="jawn">
            <div class="text-lg">Test</div>
            <form
                    method="POST"
                    action="?/test"
                    use:enhance={async ({ formData }) => {
					await handleSubmit(formData);

				}}
                    class="flex flex-row gap-[1rem]"
            >
                <input
                        type="number"
                        value="67"
                        name="silly_payload"
                        id="silly_payload"
                        class="bg-stone-50 p-[0.5rem] rounded-md"
                />
                <button type="submit" disabled={loading} class="bg-stone-100 p-[0.5rem] rounded-md">
                    {loading ? 'Loading...' : 'Fetch'}
                </button>
            </form>
        </div>
    </div>
</div>

