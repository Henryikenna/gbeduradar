'use strict'


export function getOrdinalSuffix(day) {
    const j = day % 10;
    const k = day % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  }
  
  export function formatDateWithDay(dateInput) {
    const date = dateInput instanceof Date 
      ? dateInput 
      : new Date(dateInput);
  
    const dayNum   = date.getDate();
    const suffix   = getOrdinalSuffix(dayNum);
    const weekday  = date.toLocaleDateString("en-US", { weekday: "long" });
    const month    = date.toLocaleDateString("en-US", { month: "short" });
    const year     = date.getFullYear();
  
    return `${weekday}, ${dayNum}${suffix} ${month} ${year}`;
  }
  