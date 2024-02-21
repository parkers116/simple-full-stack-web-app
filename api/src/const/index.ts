export const corsOptions = {
  origin: [
    "http://localhost:80",
    "http://localhost:3000",
    `http://${process.env.UI_HOST}:3000`,
  ],
};
