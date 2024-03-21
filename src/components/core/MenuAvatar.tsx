import React from "react";

import { useAuth } from "../../auth/AuthContext";

interface AvatarProps {
    size?: number;
    className?: string;
}

const MenuAvatar: React.FC<AvatarProps>= ({size = 8, className =''}) => {
    const { avatar} = useAuth();

    return (
        <div>
           
            {avatar ? (
                <img className={`w-${size} h-${size} rounded-full ${className}`} src={avatar} alt="user Avatar" /> 
            ) : (
                <img className={`w-${size} h-${size} rounded-full ${className}`} src="noavatar.png" alt="user Avatar" /> 
            )}
            
        </div>
    )
}
export default MenuAvatar;