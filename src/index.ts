import { RootUserService } from "./service/root-user.service";

async function main() {
  const service = new RootUserService();

  console.log("--- Scenario 1: Only password updated ---");
  await service.changePasswordOnly("user-1", "password123");
  console.log("Result: Password NOT hashed if using only password");

  console.log("\n--- Scenario 2: Password + updatedAt updated ---");
  await service.changePasswordWithUpdatedAt("user-1", "password123");
  console.log("Result: Password hashed successfully when updatedAt changes");
}

main();
