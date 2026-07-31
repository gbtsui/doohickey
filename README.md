# doohickey

## Raison d'Être

When one is trapped in a prison of his own making, when he has run out of fuel to keep going

It becomes difficult to get out when the bread outside the bars tempts his hungry stomach

type stuff

I wanted to build something low-pressure where I could experiment around with code again and make something
that I could be maybe-ish proud of. Right now, it's just a big mess of different things that happen to be in 
the same codebase. A Markdown parser, a habit tracker (with integration into Slack), a weird intro to Go via
a HTTP server. None of these really work together (I mean, they *could* if I thought of it) but they all kinda
serve the same purpose, the same telos.

That is, "ship and get back into shipping".

Not in the fandom sense of shipping, by the way.


Uses SvelteKit, TypeScript, Go, Drizzle, Postgres, and the Slack API.

AI transparency: LLMs were used for debugging. Sometimes you gotta use the tools you got at hand to prevent yourself
from moving too slow. Would have defeated the purpose to write the entire project with Claude, though.

## But wait, what does it actually do?

Great question! In terms of coherence, it would be the Kylian Mbappe Special. However, in terms of individual function,

- A Markdown parser that I learned Regex with! (Doesn't have full functionality, but it works!)
- A Slack Bot that pings me to track my habits and that lets me track via slash commands!
- A public-facing interface that lets you see what habits I've been doing or neglecting!
- A really small attempt at learning Go and how it interfaces with a frontend! It's just a very very basic HTTP server for now, but I've spent an embarassing amount of time on figuring it out.

More eventually, maybe, possibly.