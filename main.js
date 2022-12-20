import fetch from "node-fetch";

const token = process.env.vyagutaToken;
const today = new Date();
const isFriday = today.getDay() === 5;
const location = isFriday ? "OFFICE" : "HOME";

function dateFormat(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

const endpoint =
  "https://attendance.vyaguta.lftechnology.com/api/leave/worklogs";
const workDate = dateFormat(today);
const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9",
  authorization: `Bearer ${token}`,
  "content-type": "application/json",
  "sec-ch-ua":
    '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
};
const options = {
  method: "POST",
  headers: headers,
  body: JSON.stringify({ location, workDate }),
  referrer: "https://vyaguta.lftechnology.com/",
  referrerPolicy: "strict-origin-when-cross-origin",
  mode: "cors",
  credentials: "include",
};

fetch(endpoint, options)
  .then((resp) => {
    if (resp.ok) {
      console.log(`Work log submitted for ${today}`);
    } else {
      console.error(resp.status, resp.statusText);
      throw Error(`${resp.status} - ${resp.statusText}`);
    }
  })
  .catch((err) => {
    console.log(err);
  });
