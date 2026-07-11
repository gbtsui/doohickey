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
    let markdownPlainText: string = ""

    type Paragraph = {
        text: string;
        type: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "ol"
    }

    const markdownResult: Paragraph[] = []
    const parseParagraphs = (text: string): Paragraph[] => {
        const splitParagraphs: string[] = text.split(/\n/)

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

<div>

</div>