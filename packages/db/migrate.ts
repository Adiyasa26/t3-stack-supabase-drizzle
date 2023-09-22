import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db } from ".";

const main = async () => {
  console.log("migrations running...");
  await migrate(db, { migrationsFolder: "./drizzle-migrations" });
  console.log("migration finishied!!");
};

main()
  .then(() => {
    console.log("finished");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    process.exit();
  });
