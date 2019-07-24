const getLayout = uri => {
  if (uri === "/") return "home";
  let chunks = uri.split('/');
  if (chunks.length === 5 && chunks[1] === "create" && chunks[3] === "for") return "draft";
  if (chunks.length === 5 && chunks[1] === "recreate" && chunks[3] === "for") return "draft";
  if (chunks.length === 4 && chunks[1] === "recreate" && chunks[3] === "replica") return "draft";
  return "default";
}

export default getLayout;
