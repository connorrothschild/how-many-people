<template>
	<section>
		<div class="py-5 has-background-light">
			<p class="title is-spaced">{{ this.totalCases }} people have COVID-19.</p>
			<p class="subtitle mb-2">
				Just how many people is that? That's equivalent to the total state
				populations in:
			</p>
			<p
				class="is-inline-flex state-text-block"
				v-if="selectedStates.length == 0"
			>
				Select a state
			</p>
			<span
				class="is-inline-flex state-text-block"
				v-for="(name, index) in selectedStates"
				:key="index"
			>
				<p>{{ name }}</p>
			</span>
		</div>
		<p class="mt-3 heading">{{ this.remainingCases }} remaining</p>
		<div id="viz">
			<svg :width="this.width" :height="this.height">
				<g
					class="foreground"
					:transform="`translate(${margin / 2}, ${margin / 2})`"
				>
					<g
						v-for="(state, index) in states"
						class="state"
						:key="index"
						:transform="`translate(${state.grid.x * cellSize}, ${
							(state.grid.y - 1) * cellSize
						})`"
						@click="addToTotal(state)"
						v-bind:class="{
							disabled:
								userTotal + state.votes > totalCases &&
								!selectedStates.includes(state.name),
							selected: selectedStates.includes(state.name),
						}"
					>
						<rect :width="cellSize - 2" :height="cellSize - 2"></rect>
						<text :x="cellSize / 2" :y="cellSize / 2" dy=".35em">
							{{ state.id }}
						</text>
						<text class="votes" :x="cellSize - 4" :y="cellSize - 5">
							{{ state.votes }}
						</text>
					</g>
				</g>
			</svg>
		</div>
	</section>
</template>

<script>
import * as d3 from "d3";

export default {
	name: "Map",
	props: {
		states: Array,
	},
	data() {
		return {
			margin: 4,
			mapWidth: 12,
			mapHeight: 8,
			cellSize: 55,
			userTotal: 0,
			totalCases: 100,
			selectedStates: [],
			alreadyOver: false,
			stateResponsibleForOver: null,
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
		nozoom() {
			event.preventDefault();
		},
		addToTotal(d) {
			const name = d.name;
			const votes = d.votes;

			if (this.selectedStates.includes(name)) {
				this.userTotal -= votes;
				this.selectedStates = this.selectedStates.filter(function (val) {
					return name != val;
				});
			} else {
				if (this.userTotal + votes > this.totalCases) {
					console.log("This state would put over total!");
				} else {
					this.userTotal += votes;
					this.selectedStates.push(name);
				}
			}
		},
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
	},
	mounted() {
		const { nozoom, responsivefy } = this;

		d3.select("#viz svg")
			.on("touchstart", nozoom)
			.on("touchmove", nozoom)
			.call(responsivefy);
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.foreground {
	cursor: pointer;
	pointer-events: all;
}

.state text {
	font-size: 12px;
	text-anchor: middle;
	stroke: none;
	pointer-events: none;
}

.state .votes {
	font-size: 10px;
	text-anchor: end;
}

.state-text-block {
	background: #f79696;
	padding: 1px 5px;
	margin: 2px;
	border-radius: 3px;
	color: white;
}

#viz {
	max-width: 750px;
	margin: 0 auto;
}

svg {
	max-height: 100%;
	padding: 15px;
}

.disabled rect {
	fill: #eee;
}

.disabled text {
	fill: grey;
}

rect {
	fill: #dedede;
}

.state:not(.disabled):hover {
	outline: 1px solid black;
}

.state.disabled:hover {
	cursor: not-allowed;
}

.selected rect {
	fill: #f79696 !important;
}
</style>
