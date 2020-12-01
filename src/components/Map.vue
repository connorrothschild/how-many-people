<template>
	<section>
		<div class="py-5 has-background-light">
			<div class="max-width-950">
				<p class="title is-spaced high-line-height px-1">
					<span class="highlight-underline" @click="toggleSelected()">{{
						this.usSelected ? "In the United States" : "Globally"
					}}</span
					>, {{ this.millionsFormat(this.totalCases) }} people have tested
					positive for COVID-19.
				</p>
				<p class="subtitle mb-2 px-1">
					Just how many people is that? That's equivalent to the combined
					populations of:
				</p>
				<p
					class="is-inline-flex state-text-block"
					v-if="selectedStates.length == 0"
				>
					Select a state below
				</p>
				<span
					class="is-inline-flex state-text-block"
					v-for="(name, index) in selectedStates"
					:key="index"
				>
					<p>{{ name }}</p>
				</span>
			</div>
		</div>
		<div class="is-inline-flex place-center mt-3">
			<p class="heading is-size-6 mr-2 mb-0">
				{{ this.millionsFormat(this.remainingCases) }} remaining
			</p>
			<button
				class="button is-small ml-2"
				@click="
					selectedStates = [];
					userTotal = 0;
				"
			>
				Reset
			</button>
		</div>
		<div id="viz">
			<svg :width="this.width" :height="this.height">
				<g
					class="canvas"
					:transform="`translate(${margin / 2}, ${margin / 2})`"
				>
					<State
						v-for="(state, index) in states"
						class="state"
						:key="index"
						@click.native="addToTotal(state)"
						:state="state"
						:cellSize="cellSize"
						:selectedStates="selectedStates"
						:userTotal="userTotal"
						:totalCases="totalCases"
					/>
				</g>
			</svg>
		</div>
	</section>
</template>

<script>
import * as d3 from "d3";
import State from "@/components/State.vue";

export default {
	name: "Map",
	components: { State },
	props: {
		states: Array,
		usCases: Number,
		globalCases: Number,
	},
	data() {
		return {
			margin: 4,
			mapWidth: 12,
			mapHeight: 8,
			cellSize: 55,
			userTotal: 0,
			selectedStates: [],
			usSelected: false,
		};
	},
	methods: {
		responsivefy(svg) {
			var container = d3.select(svg.node().parentNode),
				width = parseInt(svg.style("width")),
				height = parseInt(svg.style("height")),
				aspect = width / height;

			svg
				.attr("viewBox", "0 0 " + width + " " + height)
				.attr("perserveAspectRatio", "xMinYMid")
				.call(resize);

			d3.select(window).on("resize." + container.attr("id"), resize);

			function resize() {
				var targetWidth = parseInt(container.style("width"));
				svg.attr("width", targetWidth);
				svg.attr("height", Math.round(targetWidth / aspect));
			}
		},
		addToTotal(d) {
			const name = d.name;
			const population = d.population;

			if (this.selectedStates.includes(name)) {
				this.userTotal -= population;
				this.selectedStates = this.selectedStates.filter(function (val) {
					return name != val;
				});
			} else {
				if (this.userTotal + population > this.totalCases) {
					console.log("This state would put us over the total!");
				} else {
					this.userTotal += population;
					this.selectedStates.push(name);
				}
			}
		},
		toggleSelected() {
			this.usSelected = !this.usSelected;

			if (this.userTotal > this.totalCases) {
				this.userTotal = 0;
				this.selectedStates = [];
			}
		},
		millionsFormat: d3.format(".3s"),
		thousandsFormat: d3.format(".1s"),
	},
	computed: {
		remainingCases: function () {
			return this.totalCases - this.userTotal;
		},
		width: function () {
			return this.mapWidth * this.cellSize + this.margin;
		},
		height: function () {
			return this.mapHeight * this.cellSize + this.margin;
		},
		totalCases: function () {
			return this.usSelected ? this.usCases : this.globalCases;
		},
	},
	mounted() {
		const { responsivefy } = this;

		d3.select("#viz svg").call(responsivefy);
	},
};
</script>

<style lang="scss">
.highlight-underline {
	border-bottom: 1px solid #f66c5e;
	border-bottom-style: solid;
	padding: 2px;
	cursor: pointer;
	transition: all 0.5s;

	&:hover {
		background: #f66c5e;
		border-radius: 3px;
		color: whitesmoke;
		transition: all 0.5s;
	}
}

.place-center {
	place-items: center;
}

.max-width-950 {
	max-width: 950px;
	margin: 0 auto;
}

.state-text-block {
	background: #f66c5e;
	padding: 1px 5px;
	margin: 2px;
	border-radius: 3px;
	color: white;
}

.high-line-height {
	line-height: 1.5 !important;
}

.canvas {
	cursor: pointer;
	pointer-events: all;
}

#viz {
	max-width: 750px;
	margin: 0 auto;
}

svg {
	max-height: 100%;
	padding: 15px;
}

.state {
	text {
		font-size: 14px;
		text-anchor: middle;
		stroke: none;
		pointer-events: none;
	}

	.population {
		font-size: 11px;
		text-anchor: center;
	}

	&:not(.disabled):hover {
		outline: 1px solid black;
	}

	&.disabled:hover {
		cursor: not-allowed;
	}
}
</style>
