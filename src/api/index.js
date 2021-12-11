import axios from "axios";

// export const getPlacesData = async (type, sw, ne) => {
//   try {
//     const {
//       data: { data },
//     } = await axios.get(
//       `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
//       {
//         params: {
//           bl_latitude: sw.lat,
//           bl_longitude: sw.lng,
//           tr_longitude: ne.lng,
//           tr_latitude: ne.lat,
//         },
//         headers: {
//           "x-rapidapi-key": process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
//           "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
//         },
//       }
//     );

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getWeatherData = async (lat, lng) => {
//   try {
//     if (lat && lng) {
//       const { data } = await axios.get(
//         "https://community-open-weather-map.p.rapidapi.com/find",
//         {
//           params: { lat, lon: lng },
//           headers: {
//             "x-rapidapi-key": process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
//             "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
//           },
//         }
//       );

//       return data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

//   const options = {
//     params: {
//       bl_latitude: southWest.lat,
//       tr_latitude: northEast.lat,
//       bl_longitude: southWest.lng,
//       tr_longitude: northEast.lng,
//     },
//     headers: {
//       "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
//       "x-rapidapi-key": "58b9943fb1mshb5c9dff5c7132afp1a7cdbjsne88c72535849",
//     },
//   };
export const getPlacesData = async (southWest, northEast) => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: southWest.lat,
        tr_latitude: northEast.lat,
        bl_longitude: southWest.lng,
        tr_longitude: northEast.lng,
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": "58b9943fb1mshb5c9dff5c7132afp1a7cdbjsne88c72535849",
      },
    });
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
