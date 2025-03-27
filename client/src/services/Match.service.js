import axios from "axios";
import { API_URL } from "./Api.service";

const MATCH_TABS = {
  LIVE: "live",
  UPCOMING: "upcoming",
  FINISHED: "finished",
};

export const fetchMatchData = async () => {
  try {
    const now = new Date();
    const nowTime = now.getTime();
  
    const TwelveHours = 12 * 60 * 60 * 1000;
    const TwelveHoursAgo = nowTime - TwelveHours;
    const TwelveHoursLater = nowTime + TwelveHours;

    const formatDate = (date) => date.toISOString().split("T")[0];

    const [liveRes, allRes] = await Promise.all([
      axios.get(`${API_URL}&match_live=1`),
      axios.get(
        `${API_URL}&from=${formatDate(
          new Date(TwelveHoursAgo)
        )}&to=${formatDate(new Date(TwelveHoursLater))}`
      ),
    ]);

    const safeArray = (data) => (Array.isArray(data) ? data : []);

    const allMatches = safeArray(allRes.data);
    const liveFromApi = safeArray(liveRes.data);

    const categorizedMatches = allMatches.map((match) => {
      const matchDateTime = new Date(
        `${match.match_date}T${match.match_time}Z`
      ).getTime();
      const matchEndTime = matchDateTime + 120 * 60 * 1000;

      if (nowTime >= matchDateTime && nowTime <= matchEndTime) {
        return { ...match, category: MATCH_TABS.LIVE };
      } else if (matchDateTime > nowTime && matchDateTime <= TwelveHoursLater) {
        return { ...match, category: MATCH_TABS.UPCOMING };
      } else if (matchEndTime < nowTime && matchEndTime >= TwelveHoursAgo) {
        return { ...match, category: MATCH_TABS.FINISHED };
      }
      return match;
    });

    const liveMatches = [
      ...liveFromApi,
      ...categorizedMatches.filter((m) => m.category === MATCH_TABS.LIVE),
    ].filter(
      (m, index, self) =>
        self.findIndex((t) => t.match_id === m.match_id) === index &&
        m.match_status !== "Finished"
    );

    const upcomingMatches = categorizedMatches.filter(
      (m) => m.category === MATCH_TABS.UPCOMING
    );

    const finishedMatches = [
      ...liveFromApi,
      ...categorizedMatches.filter(
        (m) =>
          m.category === MATCH_TABS.FINISHED &&
          m.match_hometeam_score != null &&
          m.match_awayteam_score != null
      ),
    ].filter(
      (m, index, self) =>
        self.findIndex((t) => t.match_id === m.match_id) === index &&
        m.match_status === "Finished"
    );

    return { liveMatches, upcomingMatches, finishedMatches };
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};

export const calculateLiveTimes = (liveMatches, setLiveTimes) => {
  const now = new Date();
  const initialLiveTimes = liveMatches.reduce((acc, match) => {
    const matchDateTime = new Date(
      `${match.match_date}T${match.match_time}Z`
    ).getTime();
    if (isNaN(matchDateTime)) {
      console.error(
        `Invalid date for match ${match.match_id}: match_date=${match.match_date}, match_time=${match.match_time}`
      );
      acc[match.match_id] = "0'";
      return acc;
    }
    const minutes = Math.floor((now.getTime() - matchDateTime) / 60000);
    if (minutes >= 0 && minutes <= 120) {
      acc[match.match_id] =
        minutes > 90 ? `90+${minutes - 90}'` : `${minutes}'`;
    } else {
      acc[match.match_id] = "0'";
    }
    return acc;
  }, {});
  setLiveTimes(initialLiveTimes);

  return setInterval(() => {
    setLiveTimes((prevTimes) => {
      const updatedTimes = { ...prevTimes };
      const now = new Date();
      liveMatches.forEach((match) => {
        const matchDateTime = new Date(
          `${match.match_date}T${match.match_time}Z`
        ).getTime();
        if (isNaN(matchDateTime)) {
          updatedTimes[match.match_id] = "0'";
          return;
        }
        const minutes = Math.floor((now.getTime() - matchDateTime) / 60000);
        if (minutes >= 0 && minutes <= 120) {
          updatedTimes[match.match_id] =
            minutes > 90 ? `90+${minutes - 90}'` : `${minutes}'`;
        }
      });
      return updatedTimes;
    });
  }, 1000);
};
