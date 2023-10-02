const contentful=require("contentful")

const space=process.env.NEXT_PUBLIC_CONTENTFUL_APP_SPACE
const accessToken=process.env.NEXT_PUBLIC_CONTENTFUL_APP_ACCESS_TOKEN
export const client = contentful.createClient({
space:space,
accessToken:accessToken,
});







const fetchEntries=async()=> {
 try{
  const entries = await client.getEntries()
  if (entries.items) return entries.items
 }catch(err){
  //  console.log(err)
   return {message:"error"}
 }
}
const getEntryByContentType=async(contentType)=> {
  try{
   const entries = await client.getEntries({content_type:contentType})
  //  console.log("entries",entries)
   if (entries.items) return entries.items
  }catch(err){
    // console.log("error=====>",err)
    return {message:"error"}
  }
 }
const getSingleBlogPost=async(contentType,slug)=> {
  try{
  const entry = await client.getEntries({
    content_type: contentType,
    limit: 1,
    'fields.slug[in]': slug,
  });
  return entry?.items?.map(item =>{
    const fields = item.fields
    return {
      title: fields.title,
    
      title:fields.title,
      slug:fields.slug,
      quizQuestions:fields.quizQuestions,
      audioQuestions:fields.audioQuestions,
      audios:fields.audios,
      quizInfoShow:fields?.quizInfo??null,
      isQuiz:fields.isQuiz,
      phrase1:fields.phrase1,
      phrase2:fields.phrase2,
      phrase3:fields.phrase3
    

   
    };
  })[0];
  }catch(err){
    // console.log("err",err)
  }
}

const getAllQuizes = async (setMenuCollection) => {
  const menus = await getEntryByContentType("quizMenu");
  const temperMenu = menus[0].fields.menuList.map((val) => {
    return { slug: `/cefr/${val.slug}`, title: val.title };
  });

  if(setMenuCollection){
    setMenuCollection(temperMenu);
  }
  return temperMenu
};
export default { fetchEntries ,getSingleBlogPost,getEntryByContentType,getAllQuizes}

