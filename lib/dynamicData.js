let options = [
  { slug: "levelA", title: "View Profile" },
  { slug: "levelB", title: "Visit Website" },
  { slug: "level-c", title: "Quiz Check " },
];
const menuCollection = (cefrOptions)=>{
  return [
    { title: "Certificate", options: [{ title: "Find Certificate", slug: "/retrieve-certificate" }] },
    {
      title: "CEFBR",
      options: cefrOptions,
    },
    { title: "Our Tests", options: [] },
    { title: "About Us", options: [] },
  ];
}

export default {
  menuCollection,
};
