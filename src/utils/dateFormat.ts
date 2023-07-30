/* eslint-disable no-unsafe-optional-chaining */
function formatDateToDDMM(date: string): string {
  const [year, month, day] = date?.split("-");
  return `${day}/${month}`;
}

export { formatDateToDDMM };
