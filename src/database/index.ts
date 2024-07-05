import { Sequelize } from "sequelize";
import { join } from "path"
import fs from "fs"

import migrations from "./migrations";


const dbPath = join(__dirname, "db.sqlite")

export async function runMigrations() {
  await sq.authenticate()
  for (const migration of migrations) {
    await migration.up(sq.getQueryInterface())
  }
}


if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "")
}


const sq = new Sequelize({
  dialect: "sqlite",
  storage: dbPath
})

export default sq;