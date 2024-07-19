const fs = require("fs");
const pdf = require("pdf-parse");

// const extractName = (text) => {
//   const nameRegex = /([A-Z][a-z]+\s[A-Z][a-z]+)/;
//   const match = text.match(nameRegex);
//   return match ? match[0] : "Name not found";
// };

const extractEmail = (text) => {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  const match = text.match(emailRegex);
  return match ? match[0] : "Email not found";
};

const extractPhone = (text) => {
  const phoneRegex = /(\(?\d{3}\)?\s?\d{3}[-.\s]?\d{4})/;
  const match = text.match(phoneRegex);
  return match ? match[0] : "Phone not found";
};

const processResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const text = data.text;

    // const name = extractName(text);
    const email = extractEmail(text);
    const phone = extractPhone(text);

    fs.unlinkSync(filePath);

    res.json({ email, phone });
  } catch (error) {
    res.status(500).json({ error: "Error processing resume" });
  }
};

module.exports = { processResume };
