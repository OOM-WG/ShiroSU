export default {
	async fetch(request, env, _ctx) {
		const url = new URL(request.url)
		const parts = url.pathname.split('/').filter(Boolean)

		if (parts.length !== 2) return new Response(null, { status: 404 })

		const [branch, spec] = parts
		if (!['preview', 'rc', 'release'].includes(branch)) return new Response(null, { status: 404 })

		let lines = (await (await env.ASSETS.fetch(new URL('/link-list.fvv', request.url))).text())
			.split('\n')
			.map(l => l.trim())
			.filter(Boolean)

		let branches = []
		if (spec === 'latest') {
			if (branch === 'preview') branches = ['preview', 'rc', 'release']
			else if (branch === 'rc') branches = ['rc', 'release']
			else branches = ['release']

			for (const line of lines) {
				const idx = line.indexOf('=')
				if (idx === -1) continue
				const [_, br] = line.slice(0, idx).trim().split('_')
				if (branches.includes(br))
					return Response.redirect(
						line
							.slice(idx + 1)
							.trim()
							.replace(/^"|"$/g, ''),
						301
					)
			}
			return new Response(null, { status: 404 })
		} else {
			const target = spec + '_' + branch
			for (const line of lines)
				if (line.startsWith(target)) return Response.redirect(line.split('=')[1].trim().replace(/^"|"$/g, ''), 301)
			return new Response(null, { status: 404 })
		}
	}
}
