// src/application/useCases/auth/RegisterUser.js
import { UserRepository } from "../../../infrastructure/persistence/repositories/UserRepository.js";
import { uploadOnCloudinary } from "../../../infrastructure/integrations/storage/CloudinaryAdapter.js";
import { ApiError } from "../../../infrastructure/utils/ApiError.js";



export class RegisterUser {
  constructor() {
    this.userRepo = new UserRepository();
  }

  async execute({ name, email, password, avatarFile }) {
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      throw new ApiError(400, "Name, email, and password are required");
    }

    // from Syed Asim @2021 @gmail.com tp syedasim2021@gmail.com
    const normalizedEmail = email.trim().toLowerCase();

   

    const existing = await this.userRepo.findByEmail(normalizedEmail);
    if (existing) throw new ApiError(409, "Email already exists");

    let avatarUrl = null;
    if (avatarFile?.buffer) {
      const upload = await uploadOnCloudinary(avatarFile.buffer);
      if (!upload?.secure_url) throw new ApiError(500, "Avatar upload failed");
      avatarUrl = upload.secure_url;
    }

    const user = await this.userRepo.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      avatar: avatarUrl,
      role: "customer"
    });

    return user;
  }
}