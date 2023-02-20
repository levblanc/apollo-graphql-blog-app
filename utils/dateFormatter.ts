const dateFormatter = (date: string): string => {
  return `${new Date(Number(date))}`.split(' ').splice(1, 4).join(' ');
};

export default dateFormatter;
