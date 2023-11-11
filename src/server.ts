import app from "./app";

const port = process.env.PORT || 4444;

app.listen(port, () => console.log(`Server listening on ${port}...`));