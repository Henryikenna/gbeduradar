"use strict";

import { toast } from "sonner";

export const MANUAL_GENRES = ["bedroom-pop", "amapiano", "r-&-b", "alté", "rap"];

export async function fetchGenreListFromGistFile() {
  const url = `https://api.github.com/gists/91a789da6f17f2ee20db8f55382b6653`;
  const response = await fetch(url);
  if (!response.ok) {
    toast.error(
      `Failed to load gist ${gistId}: ${response.status} ${response.statusText}`
    );
  }
  const gist = await response.json();
  return gist.files;
}
