<!--

Structure:

- take raw data
- split whenever double \n exists (remove whitespace) -- top layer <div>s
- hmmmm uhhh
- split text by "*text*" "**text**" "***text***" "_text_" "__text__" "~~text~~"  -- second layer <div>
- images lowkey advanced


state machine
if blank: next paragraph is going to be its own thing
if starting with #: count the number of # and then determine heading size
if starting with - or "* " accumulate into <ul> group
if starting with > convert to blockquote
otherwise just do plain text

THEN

in-paragraph jawn: find every * ** *** __ ~~ and then regex between?
need to learn regex help im scared

--->

<script lang="ts">
    let markdownPlainText: string = $state(`Walking the path of fragmentation, rebirth of ancient heresies. \n The Face of Janus a paradigm of Valentinic dichotomy. \n In the shape of angels rejecting the dogma of Chalcedon \n condemning the consecration of worlds`)

    type Paragraph = {
        text: string;
        type: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "ol" | "inline"
    }

    const markdownResult: Paragraph[] = $state([])
    const parseParagraphs = (text: string) => {
        markdownResult.length = 0;
        //const paragraphBlocks = text.split(/\n\s*\n/).filter(b => b.trim() !== '')
        const paragraphBlocks = text.split(/\n/).filter(b => b.trim() !== '')

        paragraphBlocks.forEach(block => {

            if (block.startsWith("# ")) {
                return markdownResult.push({text: block, type: "h1"})
            }
            if (block.startsWith("## ")) {
                return markdownResult.push({text: block, type: "h2"})
            }
            if (block.startsWith("### ")) {
                return markdownResult.push({text: block, type: "h3"})
            }
            if (block.startsWith("#### ")) {
                return markdownResult.push({text: block, type: "h4"})
            }
            if (block.startsWith("##### ")) {
                return markdownResult.push({text: block, type: "h5"})
            }
            if (block.startsWith("###### ")) {
                return markdownResult.push({text: block, type: "h6"})
            }
            if (block.startsWith("-") || block.startsWith("* ")) {
                return markdownResult.push({text: block, type: "ul"})
            }

            // ordered list gonna be unfun bro

            return markdownResult.push({text: block, type: "p"})
        })

        console.log(markdownResult)
        /*
        const rawParagraphStrings = splitParagraphs.reduce(
            (accumulator: string, currentValue, currentIndex, array: string[]) => {
                if (accumulator.trim() === `\n`) {return currentValue}
                else {
                    currentParagraphString += currentValue

                }
        })
        */

        /*
        const paragraphStringsInProgress: string[] = []
        splitParagraphs.reduce(
            (accumulator, currentValue) => {
                if (currentValue === `\n`) {paragraphStringsInProgress.push(accumulator); return `\n`}
                accumulator += currentValue;
                return accumulator
            }
        )

        const paragraphs: Paragraph[]
        paragraphStringsInProgress.forEach(paragraphString => {
            if
        })
        console.log(paragraphStringsInProgress)
         */


    }
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
        color: red;
        font-size: 1.2rem
    }

    h1 {
        font-size: 2rem;
        font-weight: bold;
    }

    h2 {
        font-size: 1.8rem;
        font-weight: bold;
    }

    h3 {
        font-size: 1.6rem;
        font-weight: bold;
    }

    h4 {
        font-size: 1.4rem;
        font-weight: bold;
    }

    h5 {
        font-size: 1.2rem;
        font-weight: bold;
    }

    h6 {
        font-size: 1rem;
        font-weight: bold;

    }
</style>

<div class="flex flex-col">
    <div>markdown / parser and renderer</div>
    <div class="flex flex-col mx-[10vw]">
        <div>insert text here</div>
        <textarea bind:value={markdownPlainText}
                  class="w-[80vw] h-[20rem] my-[1rem] bg-stone-200 p-[0.5rem]"></textarea>
        <input type="button" onclick={() => parseParagraphs(markdownPlainText)} value="parse"
               class="linkywinky cursor-pointer"/>
    </div>

    <div class="flex flex-col mx-[10vw]">
        <div>output</div>
        <div class="w-[80vw] h-[20rem] my-[1rem] bg-stone-200 p-[0.5rem]">
            {#each markdownResult as paragraph, index (index)}
                {#if paragraph.type === "p"}
                    <div>
                        {paragraph.text}
                    </div>
                {/if}
                {#if paragraph.type === "h1"}
                    <h1>
                        {paragraph.text.slice(1).trim()}
                    </h1>
                {/if}
                {#if paragraph.type === "h2"}
                    <h2>
                        {paragraph.text.slice(2).trim()}
                    </h2>
                {/if}
                {#if paragraph.type === "h3"}
                    <h3>
                        {paragraph.text.slice(3).trim()}
                    </h3>
                {/if}
                {#if paragraph.type === "h4"}
                    <h4>
                        {paragraph.text.slice(4).trim()}
                    </h4>
                {/if}
                {#if paragraph.type === "h5"}
                    <h5>
                        {paragraph.text.slice(5).trim()}
                    </h5>
                {/if}
                {#if paragraph.type === "h6"}
                    <h6>
                        {paragraph.text.slice(6).trim()}
                    </h6>
                {/if}
            {/each}
        </div>
    </div>
</div>