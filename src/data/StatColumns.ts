import {IStats, IColumns, IArtistSimple, IAlbum} from '../models';
// sort forward means lowest to highest, sort reverse means lowest to highest

export const statColumns : IColumns[] = [
  {// empty for pics
    heading: "",
    pic: "",
    isSortReversed: true,
    sortFunction: null
  },
  {
    heading: "Artist Name",
    pic: "",
    isSortReversed: true,
    sortFunction: (x: IAlbum) => x.artists[0].name
  },
  {
    heading: "Album Name",
    pic: "",
    isSortReversed: false,
    sortFunction: (x: IAlbum) => x.name
  },
  {
    heading: "Album Type",
    pic: "",
    isSortReversed: true,
    sortFunction: (x: IAlbum) => x.album_type
  },
  {// empty for dropdowns
    heading: "",
    pic: "",
    isSortReversed: true,
    sortFunction: null
  }
];
