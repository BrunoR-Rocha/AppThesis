import React from "react";

export const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.name}"` : ""}</span>
};
