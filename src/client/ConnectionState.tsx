import React from "react";

type ConnectionStateProps = {
  isConnected: boolean;
};

export default function ConnectionState({ isConnected }: ConnectionStateProps) {
  return <p>State: {"" + isConnected}</p>;
}
