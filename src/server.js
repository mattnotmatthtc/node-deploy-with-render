const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

const OPENAI_API_KEY =
  "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"; // Replace this with your actual OpenAI secret key

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const payload = {
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful NPC in a virtual world." },
      { role: "user", content: userMessage },
    ],
    max_tokens: 150,
    temperature: 0.7,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "[No response]";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reach OpenAI" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
