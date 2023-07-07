import React, { useState, useEffect, useRef } from "react";
import { MenuButton } from "../MenuButton/MenuButton";
import { useClickOutside } from "../../hooks/useClickOutside";
import "./Header.css";

export const Header = () => {
  const [isOpen, setOpen] = useState();
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => {
    setOpen(false);
    // if (isOpen) setTimeout(() => setOpen(false), 50);
  });

  useEffect(() => {
    let startTouchX = 0;
    let endTouchX = 0;
    let startTouchY = 0;
    let endTouchY = 0;

    document.addEventListener("touchstart", (event) => {
      startTouchX = event.changedTouches[0].pageX;
      startTouchY = event.changedTouches[0].pageY;
    });

    document.addEventListener("touchend", (event) => {
      endTouchX = event.changedTouches[0].pageX;
      endTouchY = event.changedTouches[0].pageY;
      if (
        startTouchX < 100 &&
        Math.abs(endTouchY - startTouchY) < 40 &&
        endTouchX > startTouchX
      )
        setOpen(true);
      if (
        startTouchX < 240 &&
        Math.abs(endTouchY - startTouchY) < 40 &&
        endTouchX < startTouchX
      )
        setOpen(false);
    });
  }, []);

  return (
    <header className="header">
      <span className="header__logo">Logo</span>
      <nav className={`header__nav ${isOpen ? "active" : ""}`} ref={menuRef}>
        <ul className="header__nav-list">
          <li className="header__nav-item">Main</li>
          <li className="header__nav-item">About</li>
          <li className="header__nav-item">Address</li>
          <li className="header__nav-item">Contacts</li>
          <li className="header__nav-item">logIn</li>
        </ul>
      </nav>
      <MenuButton isActive={isOpen} onClick={() => setOpen(!isOpen)} />
    </header>
  );
};
