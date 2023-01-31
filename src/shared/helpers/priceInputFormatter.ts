import React from 'react';

export const priceInputFormatter = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  updateValue: (value: string) => void,
) => {
  const firstDot = event.target.value.split('')[0] !== ".";

  if (event.target.value.split('.').length - 1 === 2 || !firstDot) {
    event.target.value = event.target.value.replace(/[^0-9]/, '');

    updateValue(event.target.value);
  } else {
    event.target.value = event.target.value.replace(/[^0-9.]/, '');

    updateValue(event.target.value);
  }
};
