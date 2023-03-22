import React from "react";
import styled from "styled-components";
const LikeButton = () => {
    const Button = styled.button `
        width: 2rem; 
        height: 2rem; 
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.25s ease;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size:contain;
        
        background-image: url("data:image/svg+xml;utf8,
          <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewbox='0 0 100 100'>
          <path fill='%23de3618' d='M50,88.87 C76.67,70.46 90,53.9 90,39.17 C90,17.08 63.12,3.84 50,27.63 C38.875,3.85 10,17.08 10,39.17 C10,53.9 23.33,70.46 50,88.87 Z'/></svg>");
        
        }
    `;
    return(
        <div className="bottom-0 right-0">
            <Button>
                
            </Button>
        </div>
    );
};
export default LikeButton;