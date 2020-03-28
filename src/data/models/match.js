import { Record, List } from "immutable";

export default Record(
	{
		id: 0,
		opponents: "",
		active: false,
		round: 0,
		ratings: new List(),
	},
	"match"
);
