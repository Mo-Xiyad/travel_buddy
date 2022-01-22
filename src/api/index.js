import axios from "axios";

export const getPlacesData = async (type, southWest, northEast) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: southWest.lat,
          tr_latitude: northEast.lat,
          bl_longitude: southWest.lng,
          tr_longitude: northEast.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPID_TRAVEL_API_KEY,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
