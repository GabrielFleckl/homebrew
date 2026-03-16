import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatUsername = (username) => {
  if (!username) return "";
  return username.replaceAll("_", " ");
};

export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getStrapiUrl(path) {
  if (!path) return "";

  if (import.meta.env.DEV && import.meta.env.VITE_ASSETS_URL) {
    return `${import.meta.env.VITE_ASSETS_URL}${path}`;
  }

  return path;
}

export function removeMarkdownImages(text) {
  if (!text) return "";
  return text.replace(/!\[.*?\]\(.*?\)/g, "");
}
