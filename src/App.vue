<template>
	<div id="app">
		<Map
			v-if="states.length > 0"
			:states="states"
			:usCases="usCases"
			:globalCases="globalCases"
		/>
		<Footer />
	</div>
</template>

<script>
import Map from "./components/Map.vue";
import Footer from "./components/Footer.vue";
import * as d3 from "d3";

export default {
	name: "App",
	components: { Map, Footer },
	data() {
		return {
			states: [],
			usCases: null,
			globalCases: null,
		};
	},
	async mounted() {
		const states = await d3.json("./data/states.json");
		this.states = states;

		const us = await d3.csv(
			"https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv"
		);
		const global = await d3.json("https://api.covid19api.com/summary");
		this.globalCases = +global.Global.TotalConfirmed;
		this.usCases = +us[0].cases;

		// console.log(states);
		// console.log(this.globalCases);
		// console.log(this.usCases);
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
