import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Picker from "react-mobile-picker";

const selections = ["quiz", "puzzle", "rank"];
export default function Lab() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRoot = location.pathname === "/lab";

  const [pickerValue, setPickerValue] = useState("puzzle");

  return (
    <div className="min-h-screen w-[1080px] flex pt-10 justify-between flex-col font-[yapari] text-[color:var(--primary-300)]">
      <div className="w-[1080px] h-[720px] relative inset-0 bg-[url('/images/puzzle/cosmolab_bg.png')] bg-cover p-10 flex flex-col justify-between">
        {isRoot && (
          <div className="pt-30">
            <div className="w-full text-center text-4xl">
              <h1>COSMO LAB</h1>
            </div>

            <Picker
              value={{ destination: pickerValue }}
              onChange={(val) => setPickerValue(val.destination)}
              wheelMode="normal"
              className="picker"
              height={240}
              itemHeight={60}
            >
              <Picker.Column name="destination">
                {selections.map((option) => (
                  <Picker.Item
                    key={option}
                    value={option}
                    className="cursor-pointer"
                  >
                    {({ selected }) => (
                      <div
                        className={` transition-colors ${
                          selected
                            ? "text-[color:var(--primary-300)] text-3xl"
                            : "text-[color:var(--primary-200)] text-2xl"
                        }`}
                      >
                        {option.toUpperCase()}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>

            <div className="w-full flex justify-center items-center mt-15">
              <button
                className="px-10 py-2 cursor-pointer border-1 rounded-lg  hover:text-[color:var(--bg-color)] hover:bg-[color:var(--primary-300)] hover:font-medium z-20 transition-all duration-300"
                onClick={() => navigate(pickerValue)}
              >
                LIFT OFF
              </button>
            </div>
          </div>
        )}
        <div className="w-full h-full flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
