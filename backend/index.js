const app  = require("./app");

const PORT = process.env.PORT || 5000;

/* ─────────────  Start Server  ───────────── */
app.listen(PORT, () =>
  console.log(`🌐 Server running at http://localhost:${PORT}`)
);
