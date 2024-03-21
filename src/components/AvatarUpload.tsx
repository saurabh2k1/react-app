import React, { useState } from "react";
import UserService from "../services/UserService";

const AvatarUpload: React.FC<{ userId: number }> = ({userId}) => {
    const [file, setFile] = useState<File | null>(null);
    const userService = new UserService()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    }

    const handleUpload = async () => {
        if (file) {
            try {
                await userService.uploadAvatar(file, userId);
                console.log('Avatar uploaded successfully');
            } catch (error) {
                console.error("Error uploading avatar: ", error);
            }
        }
    }

    return (
    <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file}>Upload Avatar</button>
    </div>
    );
}

export default AvatarUpload;