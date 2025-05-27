import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-38Z61H0YY2"); 
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
