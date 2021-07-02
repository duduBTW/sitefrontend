export default function isValidAccess(id: string) {
  if (!process.browser) return true;
  const Access = localStorage.getItem("Access");

  if (!Access) return true;
  const listAccess = JSON.parse(Access) as string[];

  return listAccess.includes(id);
}

// export function isValidAccessMultiple(id: string[]) {
//   const Access = localStorage.getItem("Access");

//   if (!Access) return true;
//   const listAccess = JSON.parse(Access) as string[];

//   return listAccess.map(item => );
// }
