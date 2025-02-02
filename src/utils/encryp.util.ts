import * as bcrypt from 'bcryptjs';

export class EncryptUtil {
  static async hashPassword(password: string): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const salt: string = await bcrypt.genSalt(10);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const hashedPassword: string = await bcrypt.hash(password, salt);
      return hashedPassword;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Error hashing password');
    }
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
      return isMatch;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  }
}
