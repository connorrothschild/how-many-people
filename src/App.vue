<template>
	<div id="app">
		<Map v-if="states.length > 0" :states="states" />
	</div>
</template>

<script>
import Map from "./components/Map.vue";
import * as d3 from "d3";

export default {
	name: "App",
	components: { Map },
	data() {
		return {
			states: [],
		};
	},
	async mounted() {
		const states = await d3.json("/data/states.json");
		this.states = states;
		console.log(states);
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0 auto;
}
</style>
