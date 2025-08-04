#!/usr/bin/env node
import("../dist/cli/build.js").catch((err) => {
  console.error(err);
  process.exit(1);
});