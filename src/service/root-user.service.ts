import { RootUser } from "../entity/root-user.entity";

export class RootUserService {
  // Scenario 1 – password not hashed
  async changePasswordOnly(id: string, newPassword: string): Promise<boolean> {
    const user = new RootUser(); // simulate finding user
    user.id = id;
    user.password = newPassword;

    const savedUser = await Promise.resolve(user); // simulate save
    return !!savedUser?.id;
  }

  // Scenario 2 – password hashed
  async changePasswordWithUpdatedAt(
    id: string,
    newPassword: string
  ): Promise<boolean> {
    const user = new RootUser(); // simulate finding user
    user.id = id;
    user.password = newPassword;
    user.updatedAt = new Date();

    const savedUser = await Promise.resolve(user); // simulate save
    return !!savedUser?.id;
  }
}
