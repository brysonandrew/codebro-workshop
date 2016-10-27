import {IStats, IColumns} from '../models';
// sort forward means lowest to highest, sort reverse means lowest to highest

export const statColumns : IColumns[] = [
  {
    heading: "Name",
    pic: "",
    isSortReversed: false,
    sortFunction: (x: IStats) => x.name
  },
  {
    heading: "Gender",
    pic: "",
    isSortReversed: true,
    sortFunction: (x: IStats) => x.gender
  },
  {
    heading: "Age",
    pic: "",
    isSortReversed: true,
    sortFunction: (x: IStats) => x.age
  },
  {
    heading: "Location",
    pic: "",
    isSortReversed: true,
    sortFunction: (x: IStats)  => x.location
  }
];
