import React, { Dispatch } from "react";
import { textChangeRangeNewSpan } from "typescript";

const checkService = async (): Promise<string> => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/auth/check-service`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      await res.json().then(function (text) {
        if (text.msg == "apple") {
          return "apple";
        } else if (text.msg == "spotify") {
          return "spotify";
        }
      });
      return "error";
    });
  } catch (error) {
    return "error";
  }
  return "error error";
};

export default checkService;
