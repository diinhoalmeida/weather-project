/* eslint-disable no-unsafe-optional-chaining */
function formatDateToDDMM(date: string): string {
  const [month, day] = date?.split("-");
  return `${day}/${month}`;
}

export { formatDateToDDMM };
