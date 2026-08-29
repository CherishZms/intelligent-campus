export const getToday = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  // getMonth() 从 0 开始，需 +1，padStart 补零
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};