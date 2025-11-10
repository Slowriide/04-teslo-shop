"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onValueChanged: (number: number) => void;
}

export const QuantitySelector = ({ quantity, onValueChanged }: Props) => {
  const onQuantityChange = (value: number) => {
    if (value + quantity < 1) return;
    onValueChanged(value + quantity);
  };

  return (
    <div className="flex">
      <button onClick={() => onQuantityChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onQuantityChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
