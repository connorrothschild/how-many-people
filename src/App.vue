<template>
	<div id="app">
		<div v-if="usCases & globalCases">
			<Map
				v-if="states.length > 0"
				:states="states"
				:usCases="usCases"
				:globalCases="globalCases"
			/>
			<Footer />
		</div>
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
		const states = await d3.json(
			"https://raw.githubusercontent.com/connorrothschild/how-many-people/master/public/data/states.json"
		);
		this.states = states;

		const us = await d3.csv(
			"https://raw.githubusercontent.com/nytimes/covid-19-data/master/live/us.csv"
		);
		const global = await d3.json(
			"https://coronavirus-19-api.herokuapp.com/all"
		);
		this.globalCases = +global.cases;
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
