'use server'
// import OpenAI from "openai";
import prisma from "./db";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API);
// const openai = new OpenAI({
//     apiKey:process.env.OPENAI_API_KEY
// })
// export const generateResponse = async(chatMessage)=>{
//     const response = await openai.chat.completions.create({
//         messages:[
//             {role : 'system', content : 'You are a helpful assistant!'},
//             {role : 'user', content : chatMessage},
//         ],
//         model : 'gpt-3.5-turbo',
//         temperature : 0,
//         max_tokens : 100
//     })
//     // console.log(response.choices[0].message);
//     // console.log(response);
//     return 'awesome';
// }

export const generateChatResponse = async (chatMessage) => {
  const explanation = `avoid using "**"`;
  const messageWithExplanation = `${chatMessage}\n\n${explanation}`;

  console.log(messageWithExplanation);

  const model = genAi.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 100
    }
  });

  const result = await chat.sendMessage(messageWithExplanation);
  const response = result.response;
  const text = response.text();
  return text;
};



// export const generateTourResponse = async ({ city, country }) => {
//     const query = `Find a exact ${city} in this exact ${country}.
//   If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
//   Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
//   {
//     "tour": {
//       "city": "${city}",
//       "country": "${country}",
//       "title": "title of the tour",
//       "description": "short description of the city and tour",
//       "stops": [" stop name", "stop name","stop name"]
//     }
//   }
//   "stops" property should include only three stops.
//   If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
//     try {
//     //   const response = await openai.chat.completions.create({
//     //     messages: [
//     //       { role: 'system', content: 'you are a tour guide' },
//     //       {
//     //         role: 'user',
//     //         content: query,
//     //       },
//     //     ],
//     //     model: 'gpt-3.5-turbo',
//     //     temperature: 0,
//     //   });
  
//     //   const tourData = JSON.parse(response.choices[0].message.content);
//     //   if (!tourData.tour) {
//     //     return null;
//     //   }
//     //   return { tour: tourData.tour, tokens: response.usage.total_tokens };
//     // } catch (error) {
//     //   // console.log(error);
//     //   return null;
//     }
//   };

  export const generateTourResponse = async ({ city, country }) => {
    const query = `Find a exact ${city} in this exact ${country}.
      If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
      Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
      {
        "tour": {
          "city": "${city}",
          "country": "${country}",
          "title": "title of the tour",
          "description": "short description of the city and tour",
          "stops": [" stop name", "stop name","stop name"]
        }
      }
      "stops" property should include only three stops.
      If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
        try {
        }
        catch (error) {
          null;
        }
      };

    export const getExistingTour = async({city, country})=>{
      return prisma.tour.findUnique({
        where:{
          city_country:{
            city,country
          }
        }
      })
}

export const createNewTour = async({tour})=>{
    return prisma.tour.create({
      data:tour
    });
}

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: 'asc',
      },
    });
    return tours;
  }
  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: 'asc',
    },
  });

  return tours;
};

export const getSingleTour = async (id) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};