const { Configuration, OpenAIApi } = require("openai");

const { ANIME_ATTRIBUTES } = require("@/data/anime");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  try {
    const results = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Create a new Anime character with the following unique attributes:
- Name
- Short description less than 80 characters
- The type of Anime
- The category of Anime it is
- Number of Hit Points or health
- The Anime's length in inches
- The Anime's weight in pounds
- The Anime's power name and description
- The Anime's attack name with description and Hit Points it would cause in damage
- The type of Anime it is weak against
- The type of Anime it is resistant against
- The retreat cost of the Anime
- The Anime's appearance in less than 600 characters
- The Anime's backstory in less than 600 characters
Format the response in the following JSON object ${JSON.stringify(
            ANIME_ATTRIBUTES
          )}.`,
        },
      ],
    });

    console.log(`Results: ${JSON.stringify(results.data)}}`);

    const attributes = JSON.parse(results.data.choices[0].message.content);

    res.status(200).json({
      attributes,
    });
  } catch (e) {
    console.log(e);
    console.log(`Failed to create Pokémon: ${e.message}`);
    res.status(500).json({
      error: e.message,
    });
  }
}
