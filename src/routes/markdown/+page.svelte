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
        type: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "ol" | "blockquote" | "inline"
    }

    type TextThingy = {
        text: string;
        type: ("bold" | "italic" | "underline" | "strike" | "normal")[]
    }

    type AnnotatedParagraph = {
        textThingies: TextThingy[]
        type: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "ol" | "blockquote" | "inline"
    }

    const markdownResult: Paragraph[] = $state([])
    const markdownResultForReal: AnnotatedParagraph[] = $state([])
    const parseParagraphs = (text: string) => {
        markdownResult.length = 0;

        const lines = text.split(/\n/);
        let currentParagraph: string[] = [];

        const classifyAndPush = (text: string) => {
            const headingMatch = text.match(/^(#{1,6})\s+/);
            if (headingMatch) {
                const level = headingMatch[1].length;
                const type = `h${level}` as Paragraph["type"];
                const cleanText = text.replace(/^#{1,6}\s+/, '');
                return markdownResult.push({ text: cleanText, type });
            }
            if (text.startsWith('>')) {
                const cleanText = text.replace(/^>\s?/, '');
                return markdownResult.push({ text: cleanText, type: "blockquote" });            }

            // ordered list gonna be unfun bro

            return markdownResult.push({text, type: "p"})
        }

        const flushParagraph = () => {
            if (currentParagraph.length > 0) {
                const block = currentParagraph.join('\n').trim();
                if (block) {
                    classifyAndPush(block);
                }
                currentParagraph = [];
            }
        };

        lines.forEach(line => {
            const trimmed = line.trim();

            if (trimmed === '' || trimmed.match(/^#{1,6}\s/) || (!trimmed.startsWith('>') && currentParagraph.length > 0 && currentParagraph[0].trim().startsWith('>'))) {
                flushParagraph();
                if (trimmed.match(/^#{1,6}\s/)) {
                    classifyAndPush(trimmed);
                }
            } else if (trimmed.startsWith('>')) {
                currentParagraph.push(line);
            } else {
                currentParagraph.push(line);
            }
        });
        flushParagraph();


        const parseInlineFormatting = (text: string, baseType: AnnotatedParagraph["type"]): AnnotatedParagraph => {
            // Handle formatting in order of precedence: ***bold italic***, **bold**, *italic*, __underline__, ~~strike~~
            const tokens: TextThingy[] = [];
            // Regex that captures nested/stacked formatting
            const regex = /(\*\*\*|___)(.+?)\1|(\*\*|__)(.+?)\3|(\*|_)(.+?)\5|(~~)(.+?)\7|([^*_~\n]+)/g;

            let match;
            while ((match = regex.exec(text)) !== null) {
                if (match[1]) { // ***bold italic*** or ___bold italic___
                    tokens.push({ text: match[2], type: ["bold", "italic"] });
                } else if (match[3]) { // **bold** or __underline__
                    const formatType = match[3] === '**' ? ["bold"] : ["underline"];
                    tokens.push({ text: match[4], type: formatType as TextThingy["type"]});
                } else if (match[5]) { // *italic* or _italic_
                    tokens.push({ text: match[6], type: ["italic"] });
                } else if (match[7]) { // ~~strike~~
                    tokens.push({ text: match[8], type: ["strike"] });
                } else if (match[9]) { // Normal text
                    tokens.push({ text: match[9], type: ["normal"] });
                }
            }

            return { textThingies: tokens, type: baseType };
        };

        const annotatedResults: AnnotatedParagraph[] = markdownResult.map(paragraph => {
            return parseInlineFormatting(paragraph.text, paragraph.type);
        });
        markdownResultForReal.length = 0;
        markdownResultForReal.push(...annotatedResults);

        console.log(markdownResultForReal)
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

    const renderParagraphBlock = (para: AnnotatedParagraph) => {
        //homer let the barts out

        let element: string | HTMLElement = para.textThingies.map(renderTextThingy).join("")

        //tagmap lowk unnecessary

        return `<${para.type}>${element}</${para.type}>`
    }

    const renderTextThingy = (textThingy: TextThingy) => {
        const tagMap = {
            bold: 'strong',
            italic: 'em',
            underline: 'u',
            strike: 'del'
        };

        let element: string | HTMLElement = textThingy.text;

        const activeModifiers = textThingy.type.filter(t => t !== 'normal');

        if (activeModifiers.length === 0) {
            return element;
        }

        activeModifiers.forEach(modifier => {
            if (tagMap[modifier]) {
                element = `<${tagMap[modifier]}>${element}</${tagMap[modifier]}>`;
            }
        });

        return element;
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

    :global(h1) {
        font-size: 2rem;
        font-weight: bold;
    }

    :global(h2) {
        font-size: 1.8rem;
        font-weight: bold;
    }

    :global(h3) {
        font-size: 1.6rem;
        font-weight: bold;
    }

    :global(h4) {
        font-size: 1.4rem;
        font-weight: bold;
    }

    :global(h5) {
        font-size: 1.2rem;
        font-weight: bold;
    }

    :global(h6) {
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
            {#each markdownResultForReal as paragraph, index (index)}
                <!--YES I KNOW THIS IS UNSAFE GUAC DONT XSS ME-->
                {@html renderParagraphBlock(paragraph)}
                <!--
                {#if paragraph.type === "ul"}
                    <ul>
                        {#each paragraph.text.split('\n') as item (item)}
                            <li>{item.replace(/^[-*]\s+/, '')}</li>
                        {/each}
                    </ul>
                {/if}-
                --->
            {/each}
        </div>
    </div>
</div>