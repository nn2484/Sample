export function getHmrClientOptions(previewOrigin?: string) {
  if (previewOrigin?.startsWith("https://")) {
    return {
      protocol: "wss" as const,
      clientPort: 443,
    };
  }

  return {};
}
