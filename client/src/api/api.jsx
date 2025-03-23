// server API
//export const BASE_URI = import.meta.env.VITE_SERVER_BASE_URL;
export  const BASE_URI = 'http://localhost:8000';

// football API
const API_KEY = import.meta.env.VITE_API_KEY;  // Football API Key
const FOOT_URL = import.meta.env.VITE_FOOTBALL_URL;  // Base URL for the Football API

// Construct API URL
export const API_URL = `${FOOT_URL}&APIkey=${API_KEY}`;
