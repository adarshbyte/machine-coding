"use client";

import React from "react";
import generateItems from "./temp";
type ItemType = {
    emoji:string,
    name:string,
    country:string,
    id:string
}
const InfiniteScroll = () => {
  const [data, setData] = React.useState<ItemType[]>([]);
  const observerElement = React.useRef<HTMLLIElement | null>(null);
  
  React.useEffect(() => {
    const items = generateItems(20);
    setData(items);
  }, []);

  React.useEffect(() => {
    if (!observerElement.current) return;

    const callback = (entries: { isIntersecting: boolean }[]) => {
      if (entries[0].isIntersecting) {
        const newItems = generateItems(20);
        setData((prev) => [...prev, ...newItems]);
      }
    };

    const intersectionObserver = new IntersectionObserver(callback, {
      root: null,
      threshold: 1,
    });

    if (observerElement.current) {
      intersectionObserver.observe(observerElement.current);
    }

    return () => {
      if (observerElement.current) {
        intersectionObserver.unobserve(observerElement.current);
      }
    };
  }, []);

  return (
    <ul style={ulStyle}>
      {data.map((d) => (
        <li style={liStyle} key={d.id}>
          <span style={emojiStyle}>{d.emoji}</span>
          <span style={textStyle}>{d.name}</span>
          <span style={countryStyle}>({d.country})</span>
        </li>
      ))}
      <li ref={observerElement}></li>
    </ul>
  );
};

export default InfiniteScroll;

const ulStyle: React.CSSProperties = {
  padding: "0",
  margin: "0",
  listStyle: "none",
};

const liStyle: React.CSSProperties = {
  height: "60px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "0 16px",
  borderBottom: "1px solid #eee",
  fontSize: "1.1rem",
};

const emojiStyle: React.CSSProperties = {
  fontSize: "1.5rem",
};

const textStyle: React.CSSProperties = {
  fontWeight: 500,
};

const countryStyle: React.CSSProperties = {
  marginLeft: "auto",
  fontStyle: "italic",
  color: "#555",
};
