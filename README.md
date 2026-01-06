# TypeORM Password Hook Gotcha

This repository demonstrates a **surprising behavior in TypeORM** when using the `@BeforeUpdate()` hook to hash passwords in a NestJS/TypeORM project.

---

## Problem

In TypeORM, hooks like `@BeforeUpdate()` are **only triggered when the entity is considered changed**.  
If you update **only the `password` field**, TypeORM may **not trigger the hook**, and the password could be saved in plain text!

This repository shows **two scenarios**:

---

## Scenario 1 – Password Not Hashed ❌

```ts
@BeforeInsert()
@BeforeUpdate()
hashPassword(): void {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
}

async changeRootUserPassword(id: string, newPassword: string): Promise<boolean> {
    const user = await RootUser.findOne({ where: { id } });
    if (!user) return false;

    user.password = newPassword;

    const savedUser = await user.save();
    return !!savedUser?.id;
}


Result: The password is saved in plain text, because TypeORM did not detect a change in the entity.

Scenario 2 – Password Hashed ✅

@BeforeInsert()
@BeforeUpdate()
hashPassword(): void {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
}

async changeRootUserPassword(id: string, newPassword: string): Promise<boolean> {
    const user = await RootUser.findOne({ where: { id } });
    if (!user) return false;

    user.password = newPassword;
    user.updatedAt = new Date(); // updating another field

    const savedUser = await user.save();
    return !!savedUser?.id;
}


Result: Password is properly hashed. Updating another field forces TypeORM to detect a change and triggers the hook.

Key Takeaway

Always ensure TypeORM detects a change when using hooks like @BeforeUpdate() or @BeforeInsert().

If only one field is updated (like password), consider updating a secondary field (like updatedAt) to trigger the hook.

This prevents security risks like storing plain text passwords.
```
