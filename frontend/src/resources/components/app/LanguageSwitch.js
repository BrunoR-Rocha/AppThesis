// src/components/LanguageSwitch.js

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "EN", country_code: "us" },
  { code: "pt", name: "PT", country_code: "pt" },
];

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("appLanguage");
    if (savedLanguage) {
      const foundLanguage = languages.find(
        (lang) => lang.code === savedLanguage
      );
      if (foundLanguage) {
        setCurrentLanguage(foundLanguage);
        i18n.changeLanguage(foundLanguage.code);
      }
    } else {
      const detectedLanguage =
        languages.find((lang) => lang.code === i18n.language) || languages[0];
      setCurrentLanguage(detectedLanguage);
      i18n.changeLanguage(detectedLanguage.code);
      localStorage.setItem("appLanguage", detectedLanguage.code);
    }
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang.code);
    localStorage.setItem("appLanguage", lang.code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 bg-[#1A184C] text-white focus:outline-none rounded-full"
      >
        <span className="mr-2">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <ul className="py-1">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex gap-3 w-full text-left px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none ${
                    currentLanguage.code === lang.code
                      ? "font-semibold bg-gray-100"
                      : ""
                  }`}
                  disabled={currentLanguage.code === lang.code}
                >
                  <img
                    src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${lang.country_code}.svg`}
                    alt={`${lang.name} flag`}
                    className="w-6 h-4 mr-2 object-cover"
                  />{" "}
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;
