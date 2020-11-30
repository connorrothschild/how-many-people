<template>
	<footer class="footer">
		<div class="content has-text-centered">
			<p>
				Built by
				<a
					href="https://twitter.com/CL_Rothschild"
					target="_blank"
					rel="noopener"
					>Connor Rothschild</a
				>. The source code is available
				<a
					href="https://github.com/connorrothschild/how-many-people/"
					target="_blank"
					rel="noopener"
					>here</a
				>. The map design is attributable to
				<a
					href="https://brendansudol.com/electoral-map-viz/#"
					target="_blank"
					rel="noopener"
					>Presidential Pick'em</a
				>
				by
				<a
					href="https://twitter.com/brensudol?lang=en"
					target="_blank"
					rel="noopener"
					>Brendan Sudol</a
				>.
			</p>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer",
};
</script>

<style lang="scss">
.footer {
	background: whitesmoke;

	a {
		color: black;
		border-bottom: 1px solid #f66c5e;
	}
}
</style>
